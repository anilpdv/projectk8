from flask import Flask, request, jsonify
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from PIL import Image
import numpy as np
from flask_cors import CORS

# Build the CNN model architecture
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dense(10, activation='softmax')
])

# Compile the model
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Load the pre-trained weights for the CNN-based model
model.load_weights('cnn_mnist_model_weights.h5')

# Create a Flask app instance
app = Flask(__name__)
CORS(app)
# Define a route that accepts a POST request with an image file


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the image file from the request
        image_file = request.files['image']

        # Preprocess the image
        image = Image.open(image_file).convert('L')
        # Resize to meet the CNN model input size
        image = image.resize((28, 28))
        image = np.array(image)
        image = image.reshape((1, 28, 28, 1))
        image = image.astype('float32') / 255

        # Use the pre-trained model to predict the object in the image
        prediction = model.predict(image)
        predicted_number = np.argmax(prediction)

        # Return the predicted number as a JSON response
        return jsonify({'number': int(predicted_number)})
    except Exception as e:
        # Handle any errors that may occur during the prediction process
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8081, debug=True)
