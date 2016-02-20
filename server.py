from flask import Flask
from pprint import pprint

app = Flask(__name__, static_url_path='')

@app.route('/')
def serve():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(
        host="localhost",
        port=int("8000")
    )
