// Copyright 2023 The MediaPipe Authors.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//      http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { GestureRecognizer, FilesetResolver, DrawingUtils } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
import {correctPrediction} from "./helpers.js"

let gestureRecognizer;
let runningMode = "IMAGE";
let enableWebcamButton;
let webcamRunning = false;

let valuesW = document.getElementById("webcam").getBoundingClientRect()
let values = document.getElementById("box").getBoundingClientRect()
let videoWidth = values["width"]; //"512px";
let videoHeight = videoWidth -  120; //"392px";
// Before we can use HandLandmarker class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment to
// get everything needed to run.
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
    demosSection.classList.remove("invisible");
};

loadGestureRecognizer();
/********************************************************************
// Demo 2: Continuously grab image from webcam stream and detect it.
********************************************************************/
const video = document.getElementById("webcam");
const canvasElement = document.getElementById("output_canvas");
const canvasCtx = canvasElement.getContext("2d");
const gestureOutput = document.getElementById("gesture_output");
const box = document.getElementById("box")
const box2 = document.getElementById("box2")
// Check if webcam access is supported.
function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}
// If webcam supported, add event listener to button for when user
// wants to activate it.
if (hasGetUserMedia()) {
    enableWebcamButton = document.getElementById("webcamButton");
    enableWebcamButton.addEventListener("click", enableCam);
}
else {
    console.warn("getUserMedia() is not supported by your browser");
}
// Enable the live webcam view and start detection.
function enableCam(event) {
    if (!gestureRecognizer) {
        alert("Please wait for gestureRecognizer to load");
        return;
    }
    if (webcamRunning === true) {
        webcamRunning = false;
        enableWebcamButton.innerText = "Play";
    }
    else {
        webcamRunning = true;
        enableWebcamButton.innerText = "Stop";  
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
let lastVideoTime = -1;
let results = undefined;
let text = ""
let char0 = "";    
let time1 = 0;
let time2 = 0;
let time3 = 0;
let time4 = 0;

async function predictWebcam() {
    valuesW = document.getElementById("webcam").getBoundingClientRect()
    
    const webcamElement = document.getElementById("webcam");
    // Now let's start detecting the stream.
    if (runningMode === "IMAGE") {
        runningMode = "VIDEO";
        await gestureRecognizer.setOptions({ runningMode: "VIDEO", numHands: 2 });
    }
    let nowInMs = Date.now();
    if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        results = gestureRecognizer.recognizeForVideo(video, nowInMs);
    }

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    const drawingUtils = new DrawingUtils(canvasCtx);
    canvasElement.height = valuesW["height"];
    webcamElement.style.height = videoHeight;
    box.style.height = videoHeight;
    box2.style.height = videoHeight;
    canvasElement.width = valuesW["width"];
    webcamElement.style.width = videoWidth;

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

        if (time2 - time1 > 1500) {
            if (char0 === char) {
                let c = correctPrediction(char0, nHands);
                if (text.length === 0) {
                    text = c.toUpperCase();
                }
                else {
                    text += c.toLowerCase(); 
                }
            }
            time1 = 0; 
        }
        
        gestureOutput.innerText = `${text}  |${correctPrediction(char, nHands)} ${categoryScore}`;
    }
    else {
        gestureOutput.style.display = "block";
        time4 = Date.now()
        if (time4 - time3 > 2000) {
            text += " "
            time3 = 0
        }
    }
    // Call this function again to keep predicting when the browser is ready.
    if (webcamRunning === true) {
        window.requestAnimationFrame(predictWebcam);
    }
}
