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


// format data 
const formatData = (data) => {
    let sendData =  {
        totalSolved: data.matchedUser.submitStats.acSubmissionNum[0].count,
        totalSubmissions:  data.matchedUser.submitStats.totalSubmissionNum,
        totalQuestions: data.allQuestionsCount[0].count,
        ranking: data.matchedUser.profile.ranking,
        submissionCalendar: JSON.parse(data.matchedUser.submissionCalendar),
        mostRecentSubmission: data.recentSubmissionList[0],
        recentSubmissions: data.recentSubmissionList,
    }
    return sendData;
}

//fetching the data
leetcode = (req, res) => {
    let user = req.params.id;
    fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Referer': 'https://leetcode.com'
        }, 
        body: JSON.stringify({query: query, variables: {username: user}}),
    
    })
    .then(result => result.json())
    .then(data => {
      if(data.errors){
        res.send(data);
      }else {
        res.send(formatData(data.data));
      }
    })
    .catch(err=>{
        console.error('Error', err);
        res.send(err);
    });
}
module.exports = {leetcode};