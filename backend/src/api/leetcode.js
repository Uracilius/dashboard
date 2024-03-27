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

module.exports = {fetchLeetCodeData};

