var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/handle', function(req,res) {
  console.log(request.body);
  });

module.exports = router;
