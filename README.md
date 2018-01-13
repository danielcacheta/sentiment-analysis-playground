# Sentiment Analysis Playground

This project uses Sentiment package to run analysis on a set of sentences.

## Prerequisite Technologies

* [Git](https://git-scm.com/downloads)
* npm 3.x

## Getting Started

```
git clone https://github.com/danielcacheta/sentiment-analysis-playground.git
cd sentiment-analysis-playground
npm install
```
Running the project:
```
node index.js
```
For detailed analysis results:
```
DETAILED_RESULT=1 node index.js
```
To search a different keyword on Twitter:
```
TWITTER_QUERY=keyword node index.js
```

## Twitter API Configuration

In order to use Twitter as source of sentences, it is required to include valid keys for the following properties on configs.env:
TWITTER_CONSUMER_KEY
TWITTER_CONSUMER_SECRET
TWITTER_ACCESS_TOKEN_KEY
TWITTER_ACCESS_TOKEN_SECRET
These keys can be get on [Twitter APP Management](https://apps.twitter.com)

If all the packages and modules installed successfully, it will print on console analysis results for the set of sentences that lies on sentences.js file.

## Built With

* [sentiment](https://github.com/thisandagain/sentiment) - The sentiment analysis project that provides the results