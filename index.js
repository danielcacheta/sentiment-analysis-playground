var sentiment = require('sentiment')
var Twitter = require('twitter')
require('dotenv').config({ path: 'configs.env' })

console.log('Example overriding words default values:')
console.dir(sentiment('Cats are totally amazing!', {
    'cats': 3,
    'amazing': 10
}))

var processSentences = function () {
    var sentencesPromise = new Promise(function (resolve, reject) {
        if (process.env.TWITTER_CONSUMER_KEY &&
            process.env.TWITTER_CONSUMER_SECRET &&
            process.env.TWITTER_ACCESS_TOKEN_KEY &&
            process.env.TWITTER_ACCESS_TOKEN_SECRET)
            getTwitterSentences(resolve, reject)
        else
            getLocalSentences(resolve)
    })
    sentencesPromise.then(function (val) {
        evaluateSentences(val)
    }).catch(function (reason) {
        console.log('Failure reason:', reason)
    });
};

var getLocalSentences = function (resolve) {
    resolve(require('./sentences.js').sentences)
}

var getTwitterSentences = function (resolve, reject) {
    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
    client.get('search/tweets', { q: process.env.TWITTER_QUERY }, function (error, tweets, response) {
        if (error)
            reject(error)
        else {
            var tweetsArray = []
            tweets.statuses
                .reduce((newArray, array) => newArray.concat(array), [])
                .forEach((item) =>
                    tweetsArray.push(item.text)
                )
            resolve(tweetsArray)
        }
    })
}

var evaluateSentences = function (sentences) {
    sentences.forEach(sentence => {
        console.dir(sentence)
        var evaluatedSentence = sentiment(sentence)
        if (process.env.DETAILED_RESULT == 1)
            showDetailedResult(evaluatedSentence)
        else
            showScoreResult(evaluatedSentence)
    })
}

var showDetailedResult = function (evaluatedSentence) {
    console.log('Detailed Result:')
    console.dir(evaluatedSentence)
}

var showScoreResult = function (evaluatedSentence) {
    console.log('Score: ', evaluatedSentence.score)
}

processSentences()