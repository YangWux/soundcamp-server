"use strict";

// setup
const express = require('express');
const app = express();
const router = express.Router();
const request = require('request');


// API keys
require('dotenv').config()
const SONGKICK_API = process.env.SONGKICK_API;
//process.env.SONGKICK_API; // env var set in heroku

// CONSTS
const PORT = process.env.PORT || 4200;
const BASE_URL = 'http://api.songkick.com/api/3.0/';
const PER_PAGE = 5;

// helper function
function urlBuilder(resourceUrl, params) {
  const api = 'apikey=' + SONGKICK_API + '&';
  const per_page = 'per_page=' + PER_PAGE + '&';
  var url = BASE_URL + resourceUrl + api + per_page;
  if(typeof params !== 'undefined') {
    url += params.join('&');
  }
  return url;
}

// the middleware
router.use(function(req, res, next) {
  console.log('middleware talking...');
  next();
});

// define our routes
router.get('/', function(req, res) {
  res.json({msg: 'it works!'});
});

// returns a list of venues with a query
router.get('/venues/search/:query/:page', function(req, res) {
  const query = 'query=' + req.params.query;
  const page = 'page=' + req.params.page;
  const resourceUrl = 'search/venues.json?'
  const url = urlBuilder(resourceUrl, [query, page])
  request(url, function (error, response, body) {
    res.send(JSON.parse(body));

  });
})

// returns a list of upcoming events at selected venue
// example venue id: 1092 (The Catalyst, SC)
router.get('/venues/:id/events/:page', function(req, res) {
  const page = 'page=' + req.params.page;
  const resourceUrl = 'venues/' + req.params.id + '/calendar.json?'
  const url = urlBuilder(resourceUrl, [page])
  request(url, function (error, response, body) {
    res.send(JSON.parse(body));

  });
})
// returns a list of Artist’s past events (gigography)
router.get('/artists/:id/gigography/:page', function(req, res) {
  const page = 'page=' + req.params.page;
  const resourceUrl = 'artists/' + req.params.id + '/gigography.json?'
  const url = urlBuilder(resourceUrl, [page])
  request(url, function (error, response, body) {
    res.send(JSON.parse(body));

  });
})
// returns a list of events based on lat and lng
router.get('/locations/:Latlgn/events/:page', function(req, res) {

  const page = 'page=' + req.params.page;
  const resourceUrl = 'search/locations.json?'+'location=geo:' + req.params.Latlgn+'&';
  const url = urlBuilder(resourceUrl, [page])
  request(url, function (error, response, body) {
    res.send(JSON.parse(body));
    console.log(url);
  });
})


// returns a list of artists with a query
router.get('/artists/search/:query/:page', function(req, res) {
  const query = 'query=' + req.params.query;
  const page = 'page=' + req.params.page;
  const resourceUrl = 'search/artists.json?'
  const url = urlBuilder(resourceUrl, [query, page])
  request(url, function (error, response, body) {
    res.send(JSON.parse(body));
  });
})

// returns a list of upcoming events from artist
// example venue id: 1092 (The Catalyst, SC)
router.get('/artists/:id/events/:page', function(req, res) {
  const page = 'page=' + req.params.page;
  const resourceUrl = 'artists/' + req.params.id + '/calendar.json?'
  const url = urlBuilder(resourceUrl, [page])
  request(url, function (error, response, body) {
    res.send(JSON.parse(body));
  });
})

// prefix above routes with /api
app.use('/api', router);

app.listen(PORT);
console.log('listening on port ' + PORT + '...');
