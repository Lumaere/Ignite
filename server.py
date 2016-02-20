from flask import Flask, request, url_for, redirect
from pprint import pprint

app = Flask(__name__, static_url_path='')

@app.route('/')
def serve():
    return app.send_static_file('map.html')

# @app.route('/login', methods=['GET', 'POST'])
# def login():
#     error = None
#     if request.method == 'POST':
#         for user in bigLoginObj:
#             if user['username'] == request.form['username'] &&
#                user['password'] == request.form['password']:
#                return redirect(url_for('home'))
#         else:
#             error = 'Invalid Credentials. Please try again.'
#     return redirect('login.html', error=error)



if __name__ == '__main__':
    app.run(
        debug = True,
        host="localhost",
        port=int("8000")
    )
