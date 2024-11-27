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
# import os
# import cv2
# from deepforest import main
# from flask import current_app

# def process_image(image_path, allowed_extensions):
#     print("this is path"+image_path)
#     # Check if the file type is allowed
#     if not allowed_file(image_path, allowed_extensions):
#         raise ValueError("File type not allowed")

#     # Initialize the DeepForest model
#     model = main.deepforest()
#     model.use_release()

#     # Read the uploaded image
#     img = cv2.imread(image_path)
#     if img is None:
#         raise ValueError("Error loading image")

#     # Predict tree locations
#     box_info = model.predict_image(path=image_path, return_plot=False)
#     # raster_path = get_data("OSBS_029.tif")
#     # # Window size of 300px with an overlap of 25% among windows for this small tile.
#     # predicted_raster = model.predict_tile(raster_path, return_plot = True, patch_size=300,patch_overlap=0.25)
    
#     # Draw bounding boxes and count trees
#     for n in range(len(box_info)):
#         x = (box_info.xmin[n] + box_info.xmax[n]) / 2
#         y = (box_info.ymin[n] + box_info.ymax[n]) / 2
#         cv2.circle(img, (int(x), int(y)), 6, (0, 0, 255), 2)
    
#     cv2.putText(img, "Total Trees: " + str(len(box_info)), (3, 24), cv2.FONT_HERSHEY_PLAIN, 0.8, (255, 255, 255))

#     # Save the result image in the static directory
#     static_image_path = os.path.join('static', os.path.basename(image_path))
    
#     cv2.imwrite(static_image_path, img)
#     print(f"Saving image to: {static_image_path}")

    
#     return os.path.basename(static_image_path), len(box_info)




# def allowed_file(filename, allowed_extensions):
#     return '.' in filename and \
#            filename.rsplit('.', 1)[1].lower() in allowed_extensions
