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