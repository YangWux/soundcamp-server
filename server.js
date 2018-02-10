const express = require('express');
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 4200;
const SONGKICK_API = process.env.TEST_VAR;

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