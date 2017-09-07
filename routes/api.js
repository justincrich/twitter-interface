var express = require('express');
var apirouter = express.Router();
var postTweet = require('../resources/twitterProcessing').postTweet;
var createRetweet = require('../resources/twitterProcessing').createRetweet;
var unretweet = require('../resources/twitterProcessing').unretweet;
var createFavorite = require('../resources/twitterProcessing').createFavorite;
var destroyFavorite = require('../resources/twitterProcessing').destroyFavorite;
var getTweet = require('../resources/twitterProcessing').getTweet;
var followUser = require('../resources/twitterProcessing').followUser;
var unfollowUser = require('../resources/twitterProcessing').unfollowUser;


apirouter.post('/mkTweet',function(req,res,next){

  if(req.body.status){
    postTweet(req.twClient,req.body.status).then(
      output => {
        res.send(JSON.stringify(output))
      }).catch(
        err =>res.send(JSON.stringify(err))
      )

  }else{
    res.send(JSON.stringify({error:'no status in request'}))
  }
});

apirouter.post('/unfollow/:id',function(req,res,next){
  let userID = req.params.id;
  if(req.params.id){
    unfollowUser(req.twClient,userID).then(
      output=>res.send(JSON.stringify(output))
    ).catch(err => res.send(JSON.stringify(err)))
  }else{
    res.send(JSON.stringify({error:'Request is missing ID'}))
  }
});

apirouter.post('/follow/:id',function(req,res,next){
  let userID = req.params.id;
  if(req.params.id){
    followUser(req.twClient,userID).then(
      output=>res.send(JSON.stringify(output))
    ).catch(err => res.send(JSON.stringify(err)))
  }else{
    res.send(JSON.stringify({error:'Request is missing ID'}))
  }
});

apirouter.post('/retweet/:id',function(req,res,next){
  let tweetID = req.params.id;
  if(req.params.id){
    createRetweet(req.twClient,tweetID).then(
      output=>res.send(JSON.stringify(output))
    ).catch(err => res.send(JSON.stringify(err)))
  }else{
    res.send(JSON.stringify({error:'Request is missing ID'}))
  }
});

apirouter.post('/unretweet/:id',function(req,res,next){
  let tweetID = req.params.id;
  if(req.params.id){
    unretweet(req.twClient,tweetID).then(
      output=>res.send(JSON.stringify(output))
    ).catch(err => res.send(JSON.stringify(err)))
  }else{
    res.send(JSON.stringify({error:'Request is missing ID'}))
  }
});

apirouter.post('/favorite/:id',function(req,res,next){
  let tweetID = req.params.id;
  if(req.params.id){
    createFavorite(req.twClient,tweetID).then(
      output=>res.send(JSON.stringify(output))
    ).catch(err => res.send(JSON.stringify(err)))
  }else{
    res.send(JSON.stringify({error:'Request is missing ID'}))
  }
});
apirouter.post('/unfavorite/:id',function(req,res,next){
  let tweetID = req.params.id;
  if(req.params.id){
    destroyFavorite(req.twClient,tweetID).then(
      output=>res.send(JSON.stringify(output))
    ).catch(err => res.send(JSON.stringify(err)))
  }else{
    res.send(JSON.stringify({error:'Request is missing ID'}))
  }
});

module.exports = apirouter;
