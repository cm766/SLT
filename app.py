from flask import Flask, render_template, Response, request, redirect, url_for
import cv2

app = Flask(__name__)

idiom = 'es'  # Global variable

@app.route('/', methods=['POST', 'GET'])
def home():  # Pass idiom as an argument
    if request.method == "POST":
        changeIdiom(request.form.get('selectedIdiom'))
    return render_template('index.html', idiom=idiom)  # Pass idiom to template

@app.route('/translator', methods=['POST', 'GET'])
def translator():
    if request.method == "POST":
        changeIdiom(request.form.get('selectedIdiom'))
    return render_template('translator.html', idiom=idiom)  # Pass idiom as well

if __name__ == '__main__':
    app.run(debug=True)


def changeIdiom (selected_idiom):
    global idiom
    if selected_idiom == 'es':
            idiom = 'es'
    elif selected_idiom == 'en':
        idiom = 'en'
    else:
        pass

    return 0