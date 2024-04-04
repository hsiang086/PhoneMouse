import socket
from flask import Flask, request
# import pyautogui

app = Flask(__name__)

fps = 100 
vx = 0
vy = 0
x = 0
y = 0
first_ax = 0
first_ay = 0
@app.route('/', methods=['POST'])
def index():
    try:
        data = request.get_json()
        global vx
        global vy
        global x
        global y
        global first_ax
        global first_ay
        # Extract the relevant data
        acceleration = data['data']
        if first_ax == 0:
            first_ax = acceleration['x']
        if first_ay == 0:
            first_ay = acceleration['y']
        onedfps = 1 / fps
        ax = acceleration['x'] - first_ax if abs(acceleration['x'] - first_ax) > 0.02 else 0
        ay = acceleration['y'] - first_ay if abs(acceleration['y'] - first_ay) > 0.02 else 0
        x += vx * (onedfps) + (ax * (onedfps) * (onedfps)) / 2
        y += vy * (onedfps) + (ay * (onedfps) * (onedfps)) / 2
        vx = vx + ax * onedfps
        vy = vy + ay * onedfps
        print(x, y, '\n', ax, ay)

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