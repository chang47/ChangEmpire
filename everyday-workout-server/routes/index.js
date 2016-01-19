var express = require('express');
var router = express.Router();
var cors = require('cors');

router.use(cors());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res) {
	res.json({message: "we just sent something!"});
});

module.exports = router;
