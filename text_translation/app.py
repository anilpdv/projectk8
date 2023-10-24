from flask import Flask, request, jsonify
import requests

app = Flask(__name__)


@app.route('/translate', methods=['POST'])
def translate():
    print('request', request)
    data = request.get_json()
    text = data['text']
    source_lang = data['source']
    target_lang = 'en'
    api_key = ''  # add your API key here
    print(data, "data")
    url = 'http://localhost:3000/translate'
    payload = {
        'q': text,
        'source': source_lang,
        'target': target_lang,
        'format': 'text',
    }
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, json=payload, headers=headers)

    return jsonify(response.json())


if __name__ == '__main__':
    app.run(debug=True)
