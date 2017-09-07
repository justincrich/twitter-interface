//dependencies
const Twit = require('twit');

const config = function(req,res,next){
  let twitter = new Twit({
    consumer_key:process.env.TW_KEY,
    consumer_secret:process.env.TW_SECRET,
    access_token:process.env.TW_TOKEN,
    access_token_secret:process.env.TW_TOKENSECRET
  });
  req.twClient = twitter;
  next();
}

module.exports = config;
