const express = require('express');
// const multer = require('multer');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST to respond to sendImageDataUrlToServer call from the browser */
router.post('/receiveDataUrl', function (req, res, next) {
  res.json({
    hello: "Hello"
  });
});

module.exports = router;
