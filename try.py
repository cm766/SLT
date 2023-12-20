import mediapipe as mp
import cv2 as cv
import numpy as np
import uuid
import os

mp_drawing = mp.solutions.drawing_utils
mp_hands = mp.solutions.hands

cap = cv.VideoCapture(2, cv.CAP_V4L2)


while cap.isOpened():
    ret, frame = cap.read()

    cv.imshow('Hand Tracking', image)

    if cv.waitKey(10) & 0xFF == ord('q'):
        break

cap.release()
cv.destroyAllWindows()