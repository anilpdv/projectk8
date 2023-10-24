from flask import Flask, request, send_file
from gtts import gTTS
import os
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)


@app.route('/tts', methods=['POST'])
@cross_origin(origin='*')
def tts():
    text = request.form['text']
    tts = gTTS(text)
    tts.save('audio.mp3')
    audio_file = open('audio.mp3', 'rb')
    response = send_file(audio_file, as_attachment=True,
                         download_name='audio.mp3')
    os.remove('audio.mp3')
    return response


if __name__ == '__main__':
    app.run(host="0.0.0.0", port="8080", debug=True)
