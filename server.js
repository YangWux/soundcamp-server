"use strict";

// setup
const express = require('express');
const app = express();
const router = express.Router();
const request = require('request');
const firebase = require('firebase');

// API keys
require('dotenv').config()
const SONGKICK_API = process.env.SONGKICK_API;
const FIREBASE_API = process.env.FIREBASE_API;
//process.env.SONGKICK_API; // env var set in heroku

// firebase config and init
var config = {
  apiKey: FIREBASE_API,
  authDomain: "soundcamp-cmps183.firebaseapp.com",
  databaseURL: "https://soundcamp-cmps183.firebaseio.com"
};
firebase.initializeApp(config);
var database = firebase.database();
// firebase useage:
// .ref('path/to/db'): reference to a specific path in firebase database.
// .set(...): (over)writes data to path referenced in .ref()
// database.ref('path/to/data).set({ ... });

// CONSTS
const PORT = process.env.PORT || 8000;
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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// define our routes
router.get('/', function(req, res) {
  res.json({msg: 'it works!'});
});

// the artist

// returns a list of artists with a query works
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

// returns a list of Artist’s past events (gigography) works
// example artist id: 46745 (phish)
router.get('/artists/:id/gigography/:page', function(req, res) {
  const page = 'page=' + req.params.page;
  const resourceUrl = 'artists/' + req.params.id + '/gigography.json?'
  const url = urlBuilder(resourceUrl, [page])
  request(url, function (error, response, body) {
    res.send(JSON.parse(body));

  });
})

// ==================================================

// the location

// return a list of locations based on query search works
router.get('/locations/search/:query/:page', function(req, res){
	const query = 'query=' + req.params.query;
	const page = 'page=' + req.params.page;
	const resourceUrl = 'search/locations.json?'
	const url = urlBuilder(resourceUrl, [query, page])
	request(url, function (error, response, body) {
		res.send(JSON.parse(body));
	});
})

// return a list of events in certain location works
// example location id: 24426 (london)
router.get('/locations/:id/events/:page', function(req, res){
	const page = 'page=' + req.params.page;
	const resourceUrl = 'metro_areas/' + req.params.id + '/calendar.json?'
	const url = urlBuilder(resourceUrl, [page])
	request(url, function (error, response, body) {
		res.send(JSON.parse(body));
	});
})



// returns a list of events based on lat and lng not works
// example lat,lng: 51.5078,-0.128
router.get('/locations/:lat/:lgn/events/:page', function(req, res) {
  const page = 'page=' + req.params.page;
  const location = 'location=geo:' + req.params.lat + ',' + req.params.lgn;
  const resourceUrl = 'events.json?';
  const url = urlBuilder(resourceUrl, [location,page])
  request(url, function (error, response, body) {
    res.send(JSON.parse(body));
  });
})

// ==================================================

// the venue

// returns a list of venues with a query works
router.get('/venues/search/:query/:page', function(req, res) {
  const query = 'query=' + req.params.query;
  const page = 'page=' + req.params.page;
  const resourceUrl = 'search/venues.json?'
  const url = urlBuilder(resourceUrl, [query, page])
  request(url, function (error, response, body) {
    res.send(JSON.parse(body));

  });
})

// returns a list of upcoming events at selected venue works
// example venue id: 1092 (The Catalyst, SC)
router.get('/venues/:id/events/:page', function(req, res) {
  const page = 'page=' + req.params.page;
  const resourceUrl = 'venues/' + req.params.id + '/calendar.json?'
  const url = urlBuilder(resourceUrl, [page])
  request(url, function (error, response, body) {
    res.send(JSON.parse(body));

  });
})

// ==================================================

// prefix above routes with /api
app.use('/api', router);

app.listen(PORT);
console.log('listening on port ' + PORT + '...');
