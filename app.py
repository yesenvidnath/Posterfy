from flask import Flask, render_template, request, jsonify
import requests
from pyngrok import ngrok
import atexit

app = Flask(__name__)

OMDB_API_KEY = '  '  # Replace with your OMDb API key

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['GET'])
def search():
    movie_title = request.args.get('title')
    search_url = f"http://www.omdbapi.com/?s={movie_title}&apikey={OMDB_API_KEY}"
    response = requests.get(search_url)
    data = response.json()
    return jsonify(data['Search']) if 'Search' in data else jsonify([])

@app.route('/poster', methods=['GET'])
def poster():
    movie_title = request.args.get('title')
    url = f"http://www.omdbapi.com/?t={movie_title}&apikey={OMDB_API_KEY}"
    response = requests.get(url)
    data = response.json()
    return jsonify({'poster': data.get('Poster', ''), 'title': data.get('Title', '')})

# Setup ngrok tunnel
def start_ngrok():
    ngrok.set_auth_token("  ")  # Replace with your Ngrok auth token
    public_url = ngrok.connect(5000)
    print(f" * ngrok tunnel \"{public_url}\" -> \"http://127.0.0.1:5000\"")
    return public_url

# Stop ngrok tunnel when the app exits
def stop_ngrok():
    ngrok.disconnect(public_url)

if __name__ == '__main__':
    public_url = start_ngrok()
    atexit.register(stop_ngrok)  # Ensure ngrok stops when the app exits
    app.run(port=5000)  # Run Flask app
