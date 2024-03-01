export function correctPrediction(char) {
    if (char === "b") {
        return "j"
    }
    else if (char === "j") {
        return "b"
    }
    else if (char === "l") {
        return "s"
    }
    else if (char === "s") {
        return "l"
    }
    else {
        return char
    }
}