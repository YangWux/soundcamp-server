const express = require('express');
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 4200;

// API keys
const SONGKICK_API = process.env.SONGKICK_API; // env var set in heroku

// the middleware
router.use(function(req, res, next) {
  console.log('middleware talking...');
  next();
});

// define our routes
router.get('/', function(req, res) {
  res.json({msg: SONGKICK_API});
});

// prefix above routes with /api
app.use('/api', router);

app.listen(PORT);
console.log('listening on port' + PORT + '...');