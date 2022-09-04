from flask import Flask, render_template, request, jsonify, make_response
import json
import static.py.mediapipe_gesture as mediapipe_gesture

app = Flask(__name__)
mp_gesture = mediapipe_gesture.mediapipe_gesture()

@app.route('/')
def home():
    return render_template("home.html")

@app.route('/gesture', methods = ["POST"])
def gesture():
    gesture_result = mp_gesture.start_gesture()
    result_dict = {"gesture" : "ok"}

    response_dict = app.response_class(
            response = json.dumps(result_dict),
            status = 200,
            mimetype = 'application/json'
        )
    
    return response_dict

@app.route('/voice', methods = ["POST"])
def voice():
    request_dict = request.get_json()
    print(request_dict)

    response_dict = app.response_class(
            response = json.dumps(request_dict),
            status = 200,
            mimetype = 'application/json'
        )
    
    return response_dict

if __name__ == "__main__":
    app.run(debug = True)