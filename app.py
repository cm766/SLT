from flask import Flask, render_template, Response, request, redirect, url_for

app = Flask(__name__)

idiom = 'es' 

@app.route('/', methods=['POST', 'GET'])
def home():  
    if request.method == "POST":
        changeIdiom(request.form.get('selectedIdiom'))
    return render_template('index.html', idiom=idiom)  

@app.route('/translator', methods=['POST', 'GET'])
def translator():
    if request.method == "POST":
        changeIdiom(request.form.get('selectedIdiom'))
    return render_template('translator.html', idiom=idiom) 

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