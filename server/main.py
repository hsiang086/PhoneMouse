import socket
from pprint import pprint
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['POST'])
def index():
    try:
        data = request.get_json()
        pprint(data)
        return "Success", 200
    except Exception as e:
        print(e)
        return "Error", 500
    

def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        ip_address = s.getsockname()[0]
    finally:
        s.close()
    return ip_address

if __name__ == '__main__':
    ip = get_ip()
    app.run(host=ip, port=1588, debug=True)