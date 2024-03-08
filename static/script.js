// Import mediapipe library
import { GestureRecognizer, FilesetResolver, DrawingUtils } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
// Due to model innacuracy corrections are needed
import {correctPrediction, drawButtons, checkClickButtons, clickedButton} from "./helpers.js"

let gestureRecognizer;
let webcamButton;
let webcamRunning = false;
const webcamButtonImg = document.getElementById("webcamButtonImg");

// Set values for stream size
const webcam = document.getElementById("webcam"); 
let webcamValues = webcam.getBoundingClientRect()
let videoWidth = document.getElementById("box").getBoundingClientRect()["width"];
let videoHeight = videoWidth -  120;

const video = document.getElementById("webcam");
const canvasElement = document.getElementById("output_canvas");
const canvasCtx = canvasElement.getContext("2d");
const gestureOutput = document.getElementById("gesture_output");
const box = document.getElementById("box")
const box2 = document.getElementById("box2")

// Wait for Gesture Recognizer to load
const loadGestureRecognizer = async () => {
    const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm");
    gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: "static/model_877/exported_model_877/gesture_recognizer.task",
            delegate: "GPU"
        },
    });

    await gestureRecognizer.setOptions({ runningMode: "VIDEO", numHands: 2 });

};

function enablewebcam(event) {
    
    // Check if gesture recognizer is loaded
    if (!gestureRecognizer) {
        alert("Please wait for gestureRecognizer to load");
        return;
    }

    // Check if getUserMedia() is supported
    if (!navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        alert("getUserMedia() is not supported by your browser");
        return;
    }

    if (webcamRunning === true) {
        webcamRunning = false;
        webcamButtonImg.src = "static/icons/play1.svg"
   
        if (video.srcObject && video.srcObject.getTracks) {
            video.srcObject.getTracks().forEach(track => track.stop()); 
        }
    }
    else {
        webcamRunning = true;
        webcamButtonImg.src = "static/icons/pause1.svg"  
        // Activate the webcam stream.
        navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
            video.srcObject = stream;
            video.addEventListener("loadeddata", predict);
        });
    }

    
}

// Time manager variables
let lastFrameTime = -1;
let results = undefined;
let text = "";
let char0 = "";    
let time1 = 0;
let time2 = 0;
let button = false;

const buttons = [{
        positionX: 15,
        positionY: 25,
        sizeX: 50,
        sizeY: 40,
        icon: 'static/icons/spacebar.svg',
        borderLine: 2,
        color: "blue"
    },
    {
        positionX: 80,
        positionY: 25,
        sizeX: 50,
        sizeY: 40,
        icon: 'static/icons/backspace-thin.svg',
        borderLine: 2,
        color: "blue"
    }]
async function predict() {

    webcamValues = webcam.getBoundingClientRect()

    let nowInMs = Date.now();
    if (video.currentTime !== lastFrameTime) {
        lastFrameTime = video.currentTime;
        results = gestureRecognizer.recognizeForVideo(video, nowInMs);
    }

    // Update size
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    const drawingUtils = new DrawingUtils(canvasCtx);
    canvasElement.height = webcamValues["height"];
    webcam.style.height = videoHeight;
    box.style.height = videoHeight;
    box2.style.height = videoHeight;
    canvasElement.width = webcamValues["width"];
    webcam.style.width = videoWidth;

    if (results.landmarks) {
        for (const landmarks of results.landmarks) {
            drawingUtils.drawConnectors(landmarks, GestureRecognizer.HAND_CONNECTIONS, {
                color: "#4dff88",
                lineWidth: 3
            });
            drawingUtils.drawLandmarks(landmarks, {
                color: "#ff8533",
                lineWidth: 0.03,
                radius: 3 
            });
        }
    }
    

    drawButtons(canvasCtx, buttons);
    canvasCtx.restore();

    // If sign is detected for more than 5" is added to text
    if (results.gestures.length > 0) {
        gestureOutput.style.display = "block";
        gestureOutput.style.width = videoWidth;
        const categoryName = results.gestures[0][0].categoryName;
        const categoryScore = parseFloat(results.gestures[0][0].score * 100).toFixed(2);
        // const handedness = results.handednesses[0][0].displayName;
        const nHands = results.gestures.length
        const char = categoryName.charAt(0);
        
        if (time1 === 0) {
            time1 = Date.now()
            char0 = char; 
        }
        time2 = Date.now()

        if (time2 - time1 > 1000) {
            if (char0 === char) {
                let c = correctPrediction(char0, nHands);
                if (text === "") {
                    
                    text = c.toUpperCase();
                }
                else {
                    text += c.toLowerCase(); 
                }
            }
            time1 = 0; 
        }
        
        let checkClick = checkClickButtons(results.landmarks[0][8], buttons, canvasElement.width, canvasElement.height);
        
        if (checkClick[0]) {
            if (!button) {
                button = true;
                console.log(checkClick[1]);
                if (checkClick[1] === "0") {
                    text += " ";
                    clickedButton([0], buttons, "red");
                }
                else if (checkClick[1] === "1") {
                    if (text.length > 0) {
                        text = text.slice(0, -1);
                    }
                    clickedButton([1], buttons, "red");
                }
            }
        }
        else {
            if (button) {
                button = false;
                clickedButton([0, 1], buttons, "blue");
            }
        }
        // CREATE ANOTHER ELEMENT TO SHOW PREDICTED CHAR
        gestureOutput.innerText = `${text}  |${correctPrediction(char, nHands)} ${categoryScore}`;
    }

    // MIGHT BE MODIFIED
    else {
        gestureOutput.style.display = "block";
    }
    // Call this function again to keep predicting when the browser is ready.
    if (webcamRunning === true) {
        window.requestAnimationFrame(predict);
    }
}


loadGestureRecognizer();



// If webcam supported, add event listener to webcam activation
webcamButton = document.getElementById("webcamButton");
webcamButton.addEventListener("click", enablewebcam);

const abcImgs = document.querySelectorAll(".abc");
const imgLg = document.getElementById("aLg");
const divLg = document.getElementById("abcLg");

abcImgs.forEach(img => {
    img.addEventListener("mouseover", function() {
        imgLg.src = img.src;
        divLg.classList.remove("hiden");
    });
  
    img.addEventListener("mouseleave", function() {
        divLg.classList.add("hiden");
    });

    img.addEventListener("click", function() {
        if (divLg.classList.contains("hiden")) {
            imgLg.src = img.src;
            divLg.classList.remove("hiden");          
        }
        else {
            divLg.classList.add("hiden");            
        }
      });
  });

