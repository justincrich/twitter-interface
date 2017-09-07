var express = require('express');
var router = express.Router();
var getRecentTweets = require('../resources/twitterProcessing.js').getRecentTweets;
var getRecentMessages = require('../resources/twitterProcessing.js').getRecentMessages;
var getRecentFriends = require('../resources/twitterProcessing.js').getRecentFriends;
var getUser = require('../resources/twitterProcessing.js').getUser;
/* GET home page. */
router.get('/', function(req, res, next) {
  //
  let tweetOutput = [];
  let friendOutput = [];
  let user = {};
  getUser(req.twClient)
  .then((output)=>{
    user = output;
    return getRecentTweets(req.twClient,'justincrich',5);
  }).then((output)=>{
    tweetOutput = output;
    return getRecentFriends(req.twClient,'justincrich',5);
  })
  .then((output)=>{
    friendOutput = output;
    return getRecentMessages(req.twClient,'justincrich',5);
  }).then(output=>{
    res.render('index', {
      user:user,
      tweetData:tweetOutput,
      friendData:friendOutput,
      messageData:output
    });
  })
  .catch(err=>{
    console.error(err)
  });
});

module.exports = router;
