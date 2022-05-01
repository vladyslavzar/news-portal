const express = require('express');
const cors = require('cors');
const request = require('request');
const app = express();
const _apiKey = '86093b2ae8ab4a84b5957f0c566ab1f3';

app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to CORS server 😁')
})
app.get('/cors/getHotTopic', (req, res) => {
    request(`https://newsapi.org/v2/top-headlines?language=en&apiKey=${_apiKey}`, function(error, response, body) {
        res.send(body);
    }) 
})
app.get('/cors/getTopicsInCategory/category/:category/page/:page', (req, res) => {
    request(`https://newsapi.org/v2/top-headlines?language=en&category=${req.params.category}&page=${req.params.page}&apiKey=${_apiKey}`, function(error, response, body) {
        res.send(body);
    }) 
})
app.get('/cors/getTopicsBySearch/request/:request/page/:page', (req, res) => {
    request(`https://newsapi.org/v2/everything?q=${req.params.request}&page=${req.params.page}&sortBy=publishedAt&apiKey=${_apiKey}`, function(error, response, body) {
        res.send(body);
    }) 
})
app.get('/cors/getTopicByTitle/request/:request/page/:page', (req, res) => {
    request(`https://newsapi.org/v2/everything?q=${req.params.request}&page=${req.params.page}&searchIn=title&sortBy=publishedAt&apiKey=${_apiKey}`, function(error, response, body) {
        res.send(body);
    }) 
})
app.listen(8080, () => {
    console.log('listening on port 8080')
})