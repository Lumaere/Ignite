from flask import Flask, request, url_for, redirect, render_template
from pprint import pprint

app = Flask(__name__, static_url_path='')
bigLoginObj = [ 
    {
        'username': 'admin',
        'password': 'default'
    },
    {
        'username': 'nimda',
        'password': 'password'
    }
]

@app.route('/')
def serve():
    return app.send_static_file('map.html')

@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/authenticate', methods=['GET', 'POST'])
def authenticate():
    error = None
    if request.method == 'POST':
        for user in bigLoginObj:
            if user['username'] == request.form['username'] and user['password'] == request.form['password']:
               return redirect(url_for('serve'))
        else:
            error = 'Invalid Credentials. Please try again.'
    return render_template('login.html', error=error)




if __name__ == '__main__':
    app.run(
        # debug = True,
        host="localhost",
        port=int("8000")
    )
