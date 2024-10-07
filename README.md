# Posterfy

![Posterfy Logo](https://via.placeholder.com/150)  <!-- Optional: Add a logo if you have one -->

## Overview

**Posterfy** is a web application that allows users to easily search for movies and download their posters in various resolutions. Designed for movie enthusiasts, this app leverages the OMDb API to fetch movie data and provides a user-friendly interface for downloading movie posters.

## Features

- **Search for Movies**: Enter a movie title to quickly find relevant films.
- **View Movie Posters**: Display high-quality posters for each movie.
- **Download Posters**: Download movie posters in different resolutions (Small, Medium, Large) for personal use.

## Live Demo

You can access the live version of Posterfy [here](https://posterfy-857d6085f031.herokuapp.com/).

## Technologies Used

- **Flask**: A lightweight WSGI web application framework for Python.
- **Requests**: A simple HTTP library for Python to make API calls to the OMDb API.
- **HTML/CSS**: For building the user interface.
- **JavaScript/jQuery**: For interactive features and AJAX calls.

## Getting Started

### Prerequisites

- Python 3.x
- Flask
- Requests

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/posterfy.git
   cd posterfy
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set your OMDb API Key as an environment variable:
   ```bash
   export OMDB_API_KEY='YOUR_OMDB_API_KEY'  # On Windows use `set OMDB_API_KEY='YOUR_OMDB_API_KEY'`
   ```

5. Run the application:
   ```bash
   python app.py
   ```

6. Open your browser and go to `http://127.0.0.1:5000/` to use the application.

## Contribution

Posterfy is an open-source project, and contributions are welcome! If you have suggestions for improvements or want to add new features, feel free to fork the repository and submit a pull request.

## Donations

If you enjoy using this application and would like to support its development, please consider making a donation. Your contributions help maintain and enhance this project for the community.

**[Buy Me a Coffee](https://buymeacoffee.com/yesenkandalama)**

Thank you for your support!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.