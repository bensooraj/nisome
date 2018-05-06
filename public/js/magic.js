document.addEventListener('DOMContentLoaded', function () {
    console.log("<== DOM Content Loaded ==>");

}, false);

////////////////// I M A G E  U P L O A D  &  B A S E-64  C O N V E R S I O N //////////////////
function encodeImageFileAsURL(element) {
    // Init vars
    let base64Image, imgBlobURL;

    let file = element.files[0];
    let reader = new FileReader();
    reader.onloadend = function (e) {
        // Hide the image upload camera icon
        document.getElementById('file-input-label').style.display = "none";

        let imgDataURL = e.target.result;
        base64Image = imgDataURL.split(',')[1];
        console.log("base64Image:", base64Image.substring(0, 50));

        imgBlobURL = URL.createObjectURL(file);
        document.getElementById('previewImg').src = imgBlobURL;
        document.getElementById('previewImg').style.visibility = "visible";
        console.log("imgBlobURL:", imgBlobURL);

        sendImageDataUrlToServer(base64Image);

    };
    reader.readAsDataURL(file);
}

function sendImageDataUrlToServer(base64Image) {
    // POST Request Body
    let postRequestBody = JSON.stringify({ base64Image });

    // myInit
    let myInit = {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        mode: 'cors',
        cache: 'default',
        credentials: 'include',
        body: postRequestBody
    };

    fetch('/receiveDataUrl', myInit)
        .then(status)
        .then(json)
        .then((data) => {
            console.log(data);
            // Display extracted text
            console.log("<== Text and audio data received ==>");
            console.log("<== Displaying Text ==>");
            document.getElementById("displayText").innerHTML = `<h4>${data.fullText}</h4>`;
            processAndAppendToAudioElement(data.audio);
        })
        .catch(error => console.error('Error:', error));
}

// Convert the audio data received into a block
function processAndAppendToAudioElement(audioData) {
    // Process the data
    console.log("<== Converting audio data to ArrayBuffer to Blob  ==>");
    let audioArrayBuffer = new Uint8Array(audioData.data);
    let audioBlob = new Blob([audioArrayBuffer]);

    console.log("<== Creating an object URL from the audio blob  ==>");    
    let audioObjURL = URL.createObjectURL(audioBlob);

    // Grab the audio elements from the DOM
    let myAudioElement = document.getElementById('myAudioElement') || new Audio();
    let playButton = document.getElementById('playButton');

    // 
    console.log("<== Audio object URL attached to the audio element's source  ==>");
    myAudioElement.src = audioObjURL;
    // 
    console.log("<== Allison speaks!!! Yay!!! ==>");
    myAudioElement.play();
    playButton.style.display = "block";
    playButton.addEventListener("click", function (event) {
        myAudioElement.play();
    });
}

// UTILITY FUNCTIONS
function status(response) {
    if (response.status >= 200 && response.status < 300) {
        console.log("Status is 200: ", response.status);
        return Promise.resolve(response)
    } else if (response.status >= 300 && response.status < 400) {
        console.log("Status is 300: ", response.status);
        return Promise.resolve(response)
    } else if (response.status >= 400 && response.status < 500) {
        console.log("Status is 400: ", response.status);
        return Promise.resolve(response)
    } else {
        console.log("Status is (all else): ", response.status);
        return Promise.reject(new Error(response.statusText))
    }
}

function json(response) {
    return response.json();
}