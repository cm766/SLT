export function correctPrediction(char, nHands) {
    if (char === "b") {
        return "j"
    }
    else if (char === "j") {
        return "b"
    }
    else if (char === "f") {
        return "c"
    }
    else if (char === "c") {
        return "f"
    }
    else if (char == 't') {
        if (nHands == 2){
            return 'x'
        }
        else {
            return 't'
        }
    }
    else if (char == 'o' || char == 'q') {
        if (nHands == 2){
            return 'q'
        }
        else {
            return 'o'
        }
    }
    else {
        return char
    }
}


export function drawButtons(canvas, buttonsDict) {
    // Draw button image or shape onto the canvas

    for (let i in buttonsDict) {

        canvas.fillStyle = buttonsDict[i]["color"];
        canvas.fillRect(buttonsDict[i]["positionX"], buttonsDict[i]["positionY"], buttonsDict[i]["sizeX"], buttonsDict[i]["sizeY"]);

        let img = new Image()
        img.src = buttonsDict[i]["icon"]
        
        canvas.lineWidth = 2;
       // canvas.strokeStyle = 'black'; 
       // canvas.strokeRect(buttonsDict[i]["positionX"], buttonsDict[i]["positionY"], buttonsDict[i]["sizeX"], buttonsDict[i]["sizeY"]);

        canvas.drawImage(img, buttonsDict[i]["positionX"] + 5, buttonsDict[i]["positionY"] + 1);
    }
}


export function checkClickButtons (pointerLandmark, buttonsDict, canvasW, canvasH) {
     let landmarkX = pointerLandmark["x"] * canvasW;
     let landmarkY = pointerLandmark["y"] * canvasH;

     for (let i in buttonsDict) {
        if (buttonsDict[i]["positionX"] < landmarkX && buttonsDict[i]["positionX"] + buttonsDict[i]["sizeX"] > landmarkX) {
            if (buttonsDict[i]["positionY"] < landmarkY && buttonsDict[i]["positionY"] + buttonsDict[i]["sizeY"] > landmarkY) {
                return [true, i];
            }
        }
     }
     return [false];
}

export function clickedButton (buttonIndex, buttonsDict, newColor) {
    for (let i in buttonIndex) {
        buttonsDict[buttonIndex[i]]["color"] = newColor;
    }    
}

