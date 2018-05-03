const express = require('express');
// const multer = require('multer');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST to respond to sendImageDataUrlToServer call from the browser */
router.post('/receiveDataUrl', function (req, res, next) {
  console.log(req.body.base64Image.substring(0, 50));
  console.log(JSON.stringify(process.env.GOOGLE_APPLICATION_CREDENTIALS));
  res.json({
    hello: req.body.base64Image.substring(0, 50)
  });
});

module.exports = router;