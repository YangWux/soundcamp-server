const express = require('express');
const app = express();
const router = express.Router();
const PORT = process.env.PORT;

// the middleware
router.use(function(req, res, next) {
  console.log('middleware talking...');
  next();
});

// define our routes
router.get('/', function(req, res) {
  res.json({msg: 'it works'});
});

// prefix above routes with /api
app.use('/api', router);

app.listen(PORT);
console.log('listening on port 3000...');