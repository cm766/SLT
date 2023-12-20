from flask import Flask, flash, redirect, render_template, render_template_string, request, session
#from flask_session import Session
import cv2 as cv
import mediapipe as mp


cap = cv.VideoCapture()

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')