var express = require('express')
var config = require('./config')
var debug = require('debug')('bananae')
var Twitter = require('twitter')
var path = require('path')
var app = express()
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

var tweetcache = { 'last_updated': Date.now() - 60000, 'tweets': {}, 'binich': 'nein' }

app.use(express.static(path.join(__dirname, 'public')))

app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist/')))

app.get('/binich', function (req, res) {
  if (Date.now() - tweetcache.last_updated > 10000) {
    var params = { screen_name: config.wo }
    debug('Getting tweets')
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
      tweetcache.last_updated = Date.now()
      if (!error) {
        var latestTweet = tweets[0].text
        if (latestTweet.toLowerCase().indexOf('ich bin eine banane') !== -1) {
          tweetcache.binich = 'ja'
        } else {
          tweetcache.binich = 'nein'
        }
        var responseObject = { 'binich': tweetcache.binich }
        debug({ response: responseObject, cached: false })
        res.end(JSON.stringify(responseObject))
      } else {
        debug(error)
        res.end(JSON.stringify({ 'binich': tweetcache.binich, 'error': error }))
      };
    })
  } else {
    var responseObject = { 'binich': tweetcache.binich }
    debug({ response: responseObject, cached: true })
    res.end(JSON.stringify(responseObject))
  }
})

app.listen(80, function () {
  console.log('Bananae listening on port 80')
  console.log('who: ' + config.wo)
  console.log('Telling people if I am a banana')
})
