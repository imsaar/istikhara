# Istikhara Project

A web application for Quranic reference.

## How to Run

### Option 1: Simple Browser Open
1. Open `istikhara.html` in your web browser by either:
   - Double-clicking the file in your file explorer
   - Dragging the file into an open browser window
   - Using the browser's File > Open menu option

### Option 2: Local Web Server (Recommended)
For full functionality (especially if the app makes AJAX requests), run a local web server:

#### Python (any version)
```bash
python3 -m http.server 8000
```
Then open http://localhost:8000/istikhara.html

#### Node.js (if installed)
First install http-server globally:
```bash
npm install -g http-server
```
Then run:
```bash
http-server
```
Then open http://localhost:8080/istikhara.html

#### PHP (if installed)
```bash
php -S localhost:8000
```
Then open http://localhost:8000/istikhara.html

## API Key Configuration

This application uses Google's Gemini API for Quran verse analysis. You'll need to:

1. Get a Gemini API key:
   - Go to [Google AI Studio](https://aistudio.google.com/)
   - Sign in with your Google account
   - Create a new API key in the API Keys section

2. Configure the API key:
   - Option 1: Set as environment variable before running the server:
     ```bash
     export GEMINI_API_KEY="your-api-key-here"
     ```
   - Option 2: Edit istikhara.html directly (not recommended for production):
     ```javascript
     const apiKey = "your-api-key-here";
     ```

## Project Structure

- `istikhara.html` - Main application file
- `data/` - Contains Quranic text data
  - `en-qarai.txt` - English translation
  - `quran-uthmani.txt` - Arabic text in Uthmani script

Note: Using a local web server is recommended for proper functionality if the app makes network requests.
