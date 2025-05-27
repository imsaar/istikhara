# Istikhara Quran Verse Analyzer

A web application that helps users seek guidance through randomly selected Quranic verses with optional AI-powered analysis for Istikhara practice.

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

## Features

- **Random Verse Selection**: Generates a random number (1-6236) to select a Quranic verse
- **Bilingual Display**: Shows verses in Arabic (Uthmani script) and English translation (Ali Quli Qarai)
- **Tanzil.net Integration**: Direct links to view verses on Tanzil.net for reference
- **Optional AI Analysis**: On-demand AI-powered analysis and verdict using Google's Gemini API
- **Responsive Design**: Works on desktop and mobile devices

## How It Works

1. **Perform Istikhara**: Click the button to randomly select a Quranic verse
2. **View Verse**: See the selected verse in Arabic and English translation
3. **Get AI Analysis** (Optional): Click the "Get AI Analysis & Verdict" button for AI interpretation
   - The AI provides a verdict of "Good", "Not Good", or "Neutral"
   - Includes detailed analysis explaining the reasoning

## API Key Configuration (Optional)

The AI analysis feature uses Google's Gemini API. This is **optional** - you can use the app without AI analysis.

To enable AI analysis:

1. Get a Gemini API key:
   - Go to [Google AI Studio](https://aistudio.google.com/)
   - Sign in with your Google account
   - Create a new API key in the API Keys section

2. Configure the API key:
   - Option 1: Set as environment variable before running the server:
     ```bash
     export GEMINI_API_KEY="your-api-key-here"
     ```
   - Option 2: Create a `.env` file in the project directory:
     ```
     GEMINI_API_KEY=your-api-key-here
     ```

**Note**: Without an API key, the app will work normally but the AI analysis feature will show an error when clicked.

## Project Structure

- `istikhara.html` - Main application file containing the complete web app
- `data/` - Contains Quranic text data
  - `en-qarai.txt` - English translation by Ali Quli Qarai (6,236 verses)
  - `quran-uthmani.txt` - Arabic text in Uthmani script (6,236 verses)
- `favicon.ico` - Website icon
- `README.md` - This documentation file

## Important Notes

- **Religious Guidance**: AI analysis is provided for reflection purposes only and should not be considered a definitive religious ruling
- **Data Sources**: Quranic texts are provided by Tanzil.net with English translation by Ali Quli Qarai
- **Performance**: Using a local web server is recommended for proper functionality when accessing external APIs
- **Privacy**: API calls to Google's Gemini are made only when the user explicitly clicks the "Get AI Analysis & Verdict" button

## Disclaimer

This application is designed to assist in the practice of Istikhara through reflection on Quranic verses. The AI-generated analysis should be used as a tool for contemplation and not as a substitute for proper Islamic scholarship or consultation with qualified religious authorities.
