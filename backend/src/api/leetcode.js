const { JSDOM } = require('jsdom');
const { setCache, getCache } = require('../cache/cacheUtil'); // Adjust the path as necessary

//https://github.com/faisal-shohag/leetcode_api/blob/master/leetcode.js
//graphql query
//THIS GUY IS NUTS, REALLY GOOD!!!
const query = `
  query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      profile {
        ranking
      }
      submissionCalendar
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
    recentSubmissionList(username: $username) {
      title
      timestamp
      statusDisplay
      lang
    }
  }
`;
let submissionCalendarCache = {}; // Object to store submissionCalendar data

const formatData = (data) => {
  let sendData =  {
    totalSolved: data.matchedUser.submitStats.acSubmissionNum[0].count,
    totalSubmissions:  data.matchedUser.submitStats.totalSubmissionNum,
    totalQuestions: data.allQuestionsCount[0].count,
    ranking: data.matchedUser.profile.ranking,
    submissionCalendar: JSON.parse(data.matchedUser.submissionCalendar),
    mostRecentSubmission: data.recentSubmissionList[0],
    recentSubmissions: data.recentSubmissionList,
  };
  submissionCalendarCache=JSON.parse(data.matchedUser.submissionCalendar);
  return sendData;
};

const fetchLeetCodeData = async (req, res) => {
  let user = req.params.id;
  const cacheKey = `leetcode:data:${user}`;

  try {
    let cachedData = await getCache(cacheKey);
    if (cachedData) {
      console.log('Serving from cache');
      res.send(cachedData);
      return;
    }

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
      },
      body: JSON.stringify({ query, variables: { username: user } }),
    });

    const data = await response.json();
    if (data.errors) {
      res.send(data);
    } else {
      const formattedData = formatData(data.data);
      await setCache(cacheKey, formattedData, 12 * 60 * 60); // Adjust TTL as needed
      res.send(formattedData);
    }
  } catch (err) {
    console.error('Error', err);
    res.status(500).send({ error: 'Internal server error' });
  }
};
const dom = new JSDOM('<!DOCTYPE html><body><div id="cal-heatmap"></div></body>');
global.document = dom.window.document;

async function generateHeatmapSVG(submissionCalendar) {
  console.log("Starting dynamic import of cal-heatmap...");
  
  // Dynamically import cal-heatmap
  const CalHeatmap = (await import('cal-heatmap')).default;
  console.log("CalHeatmap imported successfully.");

  const cal = new CalHeatmap();

  console.log("Preparing data for heatmap...");
  console.log("Initial submissionCalendar data:", submissionCalendar);

  // Prepare your data
  const preparedData = Object.entries(submissionCalendar).reduce((acc, [timestamp, value], index) => {
      // Convert timestamp to seconds and map to cal-heatmap's expected data format
      const timeInSeconds = Math.floor(Number(timestamp) / 1000);
      acc[timeInSeconds] = value;

      if (index < 5) { // Log the first few conversions to avoid cluttering the console
          console.log(`Mapping timestamp ${timestamp} with value ${value} to seconds: ${timeInSeconds}`);
      }

      return acc;
  }, {});

  if (Object.keys(preparedData).length === 0) {
      console.warn("Prepared data is empty. Check the input submissionCalendar format and values.");
  } else {
      console.log("Prepared data for heatmap:", preparedData);
  }

  // Options configuration for cal-heatmap
  const options = {
      itemSelector: '#cal-heatmap',
      range: 6,
      domain: { type: 'month', size: 6 },
      subDomain: { type: 'day', radius: 2 },
      verticalOrientation: false,
      data: preparedData,
      label: true,
      animationDuration: 500,
      scale: [1, 2, 3, 4],
      theme: 'light',
  };

  console.log("Options for cal-heatmap:", options);

  try {
      console.log("Attempting to paint the heatmap...");
      await cal.paint(options);
      console.log("Heatmap painted successfully.");

      const heatmapHTML = document.querySelector('#cal-heatmap').outerHTML;
      console.log("Generated heatmap HTML:", heatmapHTML.substring(0, 100)); // Log a snippet of the HTML to avoid overload
      return heatmapHTML;
  } catch (error) {
      console.error('Failed to render heatmap:', error);
      throw error; // Rethrow or handle as needed
  }
}





const getHeatmapSVG = async (req, res) => {
  const user = req.params.id;
  const cacheKey = `leetcode:heatmap:${user}`;

  if (!user) {
    return res.status(400).json({ error: 'User ID is missing' });
  }

  try {
    // Attempt to retrieve the cached SVG
    let svg = await getCache(cacheKey);
    if (!svg) {
      // If SVG is not cached, generate the SVG
      svg = await generateHeatmapSVG(submissionCalendarCache);
      await setCache(cacheKey, svg, 12 * 60 * 60); // Cache the SVG for 12 hours. Adjust TTL as needed.
    }

    // Create a JSON payload containing the SVG data
    const jsonData = { svg: svg };

    // Send the JSON response
    res.json(jsonData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {fetchLeetCodeData, getHeatmapSVG};

