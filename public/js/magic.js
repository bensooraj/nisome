
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
    // Set Headers
    let myHeaders = new Headers({
        'Content-Type': 'application/json'
    });
    // postRequestBody
    let postRequestBody = { base64Image };
    // myInit
    let myInit = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        credentials: 'include',
        body: JSON.stringify(postRequestBody)
    };

    fetch('/receiveDataUrl', myInit)
        .then(status)
        .then(json)
        .then((data) => {
            console.log(data);
        })
        .catch(error => console.error('Error:', error));
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