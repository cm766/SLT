// Import mediapipe library
import { GestureRecognizer, FilesetResolver, DrawingUtils } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
// Due to model innacuracy corrections are needed
import {correctPrediction} from "./helpers.js"

let gestureRecognizer;
let webcamButton;
let webcamRunning = false;

// Set values for stream size 
let webcamValues = document.getElementById("webcam").getBoundingClientRect()
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
        runningMode: runningMode,
        numHands: 2
    });
};

// Check if getUserMedia() is supported
function checkUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function enablewebcam(event) {
    if (!gestureRecognizer) {
        alert("Please wait for gestureRecognizer to load");
        return;
    }
    if (webcamRunning === true) {
        webcamRunning = false;
        webcamButton.innerText = "Play";
    }
    else {
        webcamRunning = true;
        webcamButton.innerText = "Stop";  
    }
    // getUsermedia parameters.
    const constraints = {
        video: true
    };
    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
        video.srcObject = stream;
        video.addEventListener("loadeddata", predictWebcam);
    });
}

// If webcam supported, add event listener to webcam activation
if (checkUserMedia()) {
    webcamButton = document.getElementById("webcamButton");
    webcamButton.addEventListener("click", enablewebcam);
}
else {
    console.warn("getUserMedia() is not supported by your browser");
}

loadGestureRecognizer();

