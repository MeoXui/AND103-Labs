var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Lab 3', student: 'Huynk - PH38086' });
});

router.get("/home", function (req, res, next) {
  res.render('home', { title: 'Home', user: "Huy dep trai" });
})

module.exports = router;