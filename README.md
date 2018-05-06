## Nisome

**Nisome** in Swahili means **read me**. That's what it does :)

You can see the trial run here: [YouTube Link](https://www.youtube.com/watch?v=ORYAURs1dXc&list=PL5fteLEpMZij0I_ObJ8bc8SwzxeBoEfBl&t=0s&index=1)

Steps to run the app locally:

#### Google Cloud Vision API:
1. Enable Google Cloud Vision API ([resource](https://cloud.google.com/vision/docs/before-you-begin))
2. Set up authentication for Cloud Vision's client library by creating a service account ([resource](https://cloud.google.com/vision/docs/libraries))
3. Store the credentials (downloaded as a JSON file) in a secure location.

#### IBM Watson Text to Speech API:
1. Create service credentials for the Text to Speech API ([resource](https://console.bluemix.net/catalog/services/text-to-speech))
2. [API Documentation](https://www.ibm.com/watson/developercloud/text-to-speech/api/v1/?node#introduction) (Node.js client library)

#### Setup:
```javascript
git clone https://github.com/bensooraj/nisome.git
cd nisome/
touch .env
```
Configure the environment variables in the `.env` file, in the following format:

```
GOOGLE_APPLICATION_CREDENTIALS=./GoogleCloudVisionServiceAccountCred/service-account-cred.json
IBM_WATSON_TEXT_TO_SPEECH_USERNAME=some-random-gibberish-watson-username
IBM_WATSON_TEXT_TO_SPEECH_PASSWORD=gibberish-watson-password
```

Note: I am storing Google Cloud Vision's (service credentials) json file under `GoogleCloudVisionServiceAccountCred` within my project directory (just a random choice).

Finally,
```
npm install
npm start
```

Head to => http://localhost:3000/
