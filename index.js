var sentiment = require('sentiment')
var sentences = require('./sentences.js').sentences

sentences.forEach(sentence => {
    console.dir(sentence)
    console.dir(sentiment(sentence))
});

console.log('Overriding words value:')
console.dir(sentiment('Cats are totally amazing!', {
    'cats': 3,
    'amazing': 10
}));