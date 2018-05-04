const fs = require('fs');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
// Creates a client
const client = new vision.ImageAnnotatorClient();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

/* POST to respond to sendImageDataUrlToServer call from the browser */
router.post('/receiveDataUrl', function (req, res, next) {

    console.log(JSON.stringify(process.env.GOOGLE_APPLICATION_CREDENTIALS));
    console.log(req.body.base64Image.substring(0, 50));
    let imageBuffer = Buffer.from(req.body.base64Image, 'base64');
    // console.log(imageBuffer);
    console.log(Buffer.isBuffer(imageBuffer));

    // Performs label detection on the image file
    client
        .textDetection({
            image: { content: imageBuffer }
        }).then(response => {
            const content = response[0].textAnnotations;
            console.log('Labels:');
            content.forEach(text => console.log(text.description));
            const fullText = response[0].fullTextAnnotation.text;
            return res.json({ error: null, fullText });

        }).catch(err => {
            console.error(err);
            return res.json({ error: err.toString() });
        });

});

module.exports = router;