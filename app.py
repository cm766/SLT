from flask import Flask, render_template, Response
import cv2

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index1.html')
          

if __name__ == '__main__':
    app.run(debug=True)
