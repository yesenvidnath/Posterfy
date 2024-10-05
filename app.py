from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

OMDB_API_KEY = 'YOUR_API_KEY'  # Replace with your OMDb API key

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

if __name__ == '__main__':
    app.run(debug=True)
