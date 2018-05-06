const fs = require('fs');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
// Creates a client
const client = new vision.ImageAnnotatorClient();

// IBM Watson Text to Speech API
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var textToSpeech = new TextToSpeechV1({
    username: process.env.IBM_WATSON_TEXT_TO_SPEECH_USERNAME,
    password: process.env.IBM_WATSON_TEXT_TO_SPEECH_PASSWORD
});

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(process.env.IBM_WATSON_TEXT_TO_SPEECH_USERNAME);
    res.render('index');
});

/* POST to respond to sendImageDataUrlToServer call from the browser */
router.post('/receiveDataUrl', function (req, res, next) {

    console.log(JSON.stringify(process.env.GOOGLE_APPLICATION_CREDENTIALS));
    console.log(req.body.base64Image.substring(0, 50));
    let imageBuffer = Buffer.from(req.body.base64Image, 'base64');
    // console.log(imageBuffer);
    console.log(Buffer.isBuffer(imageBuffer));

    // Performs label detection on the image file
    // client
    //     .textDetection({
    //         image: {
    //             content: imageBuffer
    //         }
    //     }).then(response => {
    //         const content = response[0].textAnnotations;
    //         console.log('Labels:');
    //         content.forEach(text => console.log(text.description));
    //         const fullText = response[0].fullTextAnnotation.text;
    //         // Strip new lines and/or carriage returns

    //         // Define the params for making the text to speech request
    //         var params = {
    //             text: "Hi", //fullText.replace(/\r?\n|\r/g, ""),
    //             voice: 'en-US_AllisonVoice',
    //             accept: 'audio/wav'
    //         };

    //         // Call the text to speech API
    //         textToSpeech
    //             .synthesize(params, function (err, audio) {
    //                 if (err) {
    //                     console.log(err);
    //                     throw "There was an error with the IBM Text to Speech API: " + err.toString();
    //                 }
    //                 textToSpeech.repairWavHeader(audio);

    //                 return res.json({
    //                     error: null,
    //                     fullText,
    //                     audio
    //                 });

    //             });

    //     }).catch(err => {
    //         console.error(err);
    //         return res.json({
    //             error: err.toString()
    //         });
    //     });
    // Define the params for making the text to speech request
    var params = {
        text: "Ben",
        voice: 'en-US_AllisonVoice',
        accept: 'audio/wav'
    };

    // Call the text to speech API
    textToSpeech
        .synthesize(params, function (err, audio) {
            if (err) {
                console.log(err);
                throw "There was an error with the IBM Text to Speech API: " + err.toString();
            }
            textToSpeech.repairWavHeader(audio);

            return res.json({
                error: null,
                fullText: "fullText",
                audio
            });

        });
});

module.exports = router;