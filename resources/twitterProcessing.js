//used to format times
const moment = require('moment');

var getUser = function(client){
  return new Promise((resolve,reject)=>{
    client.get(
      'account/verify_credentials',
      {},
      function (err, data, response){
        if (err){
          reject(err);
        }
        if (data){
          resolve({
            name: data.name,
            username: data.screen_name,
            friendCount: data.friends_count,
            image: data.profile_image_url
          });
        }
      }
    )
  });
}

var getRecentTweets = function (client,username,tweetNum = 5){
  return new Promise((resolve,reject)=>{
    client.get(
      'statuses/user_timeline',
      {
        screen_name:username,
        count:tweetNum
      },
      function(err, data, response){
        if(err){
          reject(err);
        }
        if(data){

          let user = {

          }
          let output = [];
          let index = 0;
          while(index<data.length){
            let tweet = data[index];
            output.push({
              id:tweet.id,
              name:tweet.user.name,
              username:tweet.user.screen_name,
              image:tweet.user.profile_image_url,
              tweetURL:(tweet.entities.urls[0] != undefined? tweet.entities.urls[0].url : undefined),
              profileURL:`https://twitter.com/${tweet.user.screen_name}`,
              text:tweet.text,
              date:moment(new Date(tweet.created_at)).fromNow(),
              favorite_count:tweet.favorite_count,
              retweet_count:tweet.retweet_count
            })
            index++;
          }
          resolve(output);
        }
      });
  });
}

var getRecentFriends = function (client,username,messageNum = 5){
  return new Promise((resolve,reject)=>{
    client.get(
      'friends/list',
      {
        screen_name:username,
        count:messageNum
      },
      function(err, data, response){
        if(err){
          reject(err);
        }
        if(data){
          let users = data.users;
          let output = [];
          let index = 0;
          while (index<users.length){
            let user = users[index];
            output.push({
              id:user.id,
              name:user.name,
              username:user.screen_name,
              url:user.url,
              image:user.profile_image_url
            });
            index++;
          }
          resolve(output);
        }
      }
    )
  });
}

var getRecentMessages = function (client, username,tweetNum = 5){
  return new Promise((resolve,reject)=>{
    client.get(
      "direct_messages",
      {
        screen_name:username,
        count:tweetNum
      },
      function(err, data, response){
        if(err){
          reject(err)
        }
        if(data){
          let messages = data;
          console.log(messages);
          let output = [];
          let index = 0;
          while (index<messages.length){
            let message = messages[index];
            output.push({
              id:message.id,
              text:message.text,
              sender:{
                name:message.sender.name,
                username:message.sender.screen_name,
                url:message.sender.url,
                image:message.sender.profile_image_url
              },
              recipient:{
                name:message.recipient.name,
                username:message.recipient.screen_name,
                url:message.recipient.url,
                image:message.recipient.profile_image_url
              }
            });
            index++;
          }
          resolve(output);
        }
      }
    )
  });
}
module.exports.getUser = getUser;
module.exports.getRecentTweets = getRecentTweets;
module.exports.getRecentMessages = getRecentMessages;
module.exports.getRecentFriends = getRecentFriends;
