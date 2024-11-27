
import os
import pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.preprocessing import StandardScaler
import multiprocessing
app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "*", "allow_headers": ["Content-Type", "Authorization"]}})

app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif','tif'}

# Load the pickle file
with open('deformationn_model.pkl', 'rb') as f:
    model_data = pickle.load(f)

model = model_data['model']       # Trained model
scaler = model_data.get('scaler')  # Optional: Scaler, if preprocessing is needed

@app.route('/predict', methods=['POST'])
def predict_deformation():
    try:
        # Parse input JSON
        data = request.get_json()
        time = data.get('time')
        force = data.get('force')

        if time is None or force is None:
            return jsonify({'error': 'Missing required fields: time or force'}), 400

        # Preprocess input (if a scaler is used)
        input_features = [[time, force]]
        if scaler:
            input_features = scaler.transform(input_features)

        # Predict deformation
        prediction = model.predict(input_features)
        print("in predict")
        print(float(prediction[0]))
        # Return result
        return jsonify({'deformation': float(prediction[0])})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run Flask app
if __name__ == '_main_':
    app.run(debug=True)







@app.route('/optimalpath', methods=['GET', 'POST'])
def OptimalPath():
    if request.method == 'POST':
        if 'file' not in request.files:
            return {"error": "No file part"}, 400
        file = request.files['file']
        if file.filename == '':
            return {"error": "No selected file"}, 400
        if file and allowed_file(file.filename):
            filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(filename)
            try:
                # Get start and end points from form data
                start_x = int(request.form['start_x'])
                start_y = int(request.form['start_y'])
                end_x = int(request.form['end_x'])
                end_y = int(request.form['end_y'])

                # Image segmentation and path finding logic
                img_seg = ImageSeg(filename)
                img = img_seg.IsoGrayThresh()
                optimal_path = OptimalPathing(img, filename)

                # Compute the path using Dijkstra's algorithm
                coords = optimal_path.ComputeDjikstra(start_pixel=(start_x, start_y), target_pixel=(end_x, end_y))

                # Return the processed image path and computed coordinates
                return {
                    "image_path": "static/optimal_path.png",  # Ensure the processed image is saved in static folder
                    "coords": coords
                }
            except ValueError as e:
                return {"error": str(e)}, 500
    return {"error": "Invalid request method"}, 400


# Weather API configuration
API_KEY = '3489cc20d924408ab6ef1ce68eea7588'
url = 'https://api.weatherbit.io/v2.0/current'

@app.route('/location', methods=['GET', 'POST'])
def index():
    weather_data = None
    error = None
    
    if request.method == 'POST':
        city = request.form.get('city')
        
        # Define the parameters
        params = {
            'city': city,
            'key': API_KEY,
            'include': 'minutely'
        }
        
        # Make the API request
        response = requests.get(url, params=params)
        
        if response.status_code == 200:
            data = response.json()
            if data['count'] > 0:
                weather_data = {
                    "City": data["data"][0]["city_name"],
                    "Temperature": data["data"][0]["temp"],
                    "Humidity": data["data"][0]["rh"],
                    "Wind Speed": data["data"][0]["wind_spd"],
                    "Wind Direction": data["data"][0]["wind_cdir_full"],
                    "Weather Description": data["data"][0]["weather"]["description"],
                    "Visibility": data["data"][0]["vis"],
                    "Sunrise": data["data"][0]["sunrise"],
                    "Sunset": data["data"][0]["sunset"]
                }
            else:
                error = "City not found."
        else:
            error = f"Error: {response.status_code}"
    
    return render_template('Location.html', weather_data=weather_data, error=error)


@app.route('/set-waypoint', methods=['POST'])
def set_waypoint():
    try:
        # Get the JSON data from the request
        data = request.get_json()

        # Extract the waypoints array
        waypoints = data.get('waypoints', [])

        if not waypoints:
            return jsonify({'message': 'No waypoints received.'}), 400

        # Print the waypoints (or save them to a file/database)
        for idx, waypoint in enumerate(waypoints, 1):
            print(f"Waypoint {idx}: ({waypoint['lat']}, {waypoint['lng']})")

        # Return success response
        return jsonify({'message': 'Waypoints received successfully.', 'waypoints': waypoints}), 200

    except Exception as e:
        # In case of any error, return an error response
        print(f"Error: {e}")
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']


if __name__ == '__main__':
    multiprocessing.freeze_support()
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    app.run(debug=True)
