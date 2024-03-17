from flask import Flask, render_template, Response, request, url_for, redirect
import cv2

app = Flask(__name__)

idiom = 'es'

@app.route('/')
def home():
    return render_template('index.html', idiom=idiom)
          
@app.route('/translator')
def translator():
    return render_template('translator.html', idiom=idiom)

@app.route('/idiom', methods=['POST'])
def changeIdiom ():
    selected_idiom = request.form.get('selectedIdiom')

    if selected_idiom == 'es':
        idiom = 'es'
    elif selected_idiom == 'en':
        idiom = 'en'
    else:
        pass
    

    # Redirect back to the referrer URL
    return redirect(request.referrer, idiom=idiom)

if __name__ == '__main__':
    app.run(debug=True)
