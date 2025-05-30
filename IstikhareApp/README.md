
# Quranic Istikhara - React Native App

A native mobile application for seeking guidance through randomly selected Quranic verses with optional AI-powered analysis for Istikhara practice. This app works offline for verse selection and only requires internet connectivity for AI analysis.

## Features

- **Offline Verse Selection**: All 6,236 Quranic verses are stored locally
- **Bilingual Display**: Shows verses in Arabic (Uthmani script) and English translation (Ali Quli Qarai)
- **Tanzil.net Integration**: Direct links to view verses on Tanzil.net for reference
- **Optional AI Analysis**: On-demand AI-powered analysis and verdict using Google's Gemini API
- **Network-Aware**: Only requires internet for AI analysis feature
- **Native Performance**: Built with React Native and Expo for optimal mobile experience
- **Secure API Key Storage**: Encrypted local storage for API keys

## Prerequisites

- Node.js (version 14 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- For iOS development: Xcode (macOS only)
- For Android development: Android Studio

## Installation

1. **Navigate to the project:**
   ```bash
   cd IstikhareApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator:**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Press `w` for web browser

## Building for Production

### Android APK
```bash
npx expo build:android
```

### iOS App
```bash
npx expo build:ios
```

### Web
```bash
npx expo export:web
```

## API Key Configuration (Optional)

The AI analysis feature uses Google's Gemini API. This is **optional** - the app works fully offline without it.

To enable AI analysis:

1. **Get a Gemini API key:**
   - Go to [Google AI Studio](https://aistudio.google.com/)
   - Sign in with your Google account
   - Create a new API key in the API Keys section

2. **Configure in the app:**
   - Open the app
   - Tap "Configure API Key" at the bottom
   - Enter your API key
   - The key is securely stored on your device

## How It Works

1. **Perform Istikhara**: Tap the button to randomly select a Quranic verse (works offline)
2. **View Verse**: See the selected verse in Arabic and English translation
3. **Get AI Analysis** (Optional): Tap the "Get AI Analysis & Verdict" button for AI interpretation
   - Requires internet connection
   - The AI provides a verdict of "Good", "Not Good", or "Neutral"
   - Includes detailed analysis explaining the reasoning

## Project Structure

```
IstikhareApp/
├── assets/
│   └── data/
│       ├── quran-uthmani.txt      # Arabic text (6,236 verses)
│       └── en-qarai.txt           # English translation
├── components/
│   ├── VerseDisplay.tsx           # Displays selected verse
│   ├── AIAnalysisDisplay.tsx      # Shows AI analysis results
│   └── LoadingSpinner.tsx         # Loading indicator
├── services/
│   ├── QuranService.ts            # Handles Quran data loading
│   └── AIService.ts               # Manages AI API calls
├── types/
│   └── index.ts                   # TypeScript type definitions
├── App.tsx                        # Main application component
├── app.json                       # Expo configuration
└── package.json                   # Dependencies and scripts
```

## Key Features Implementation

### Offline Capability
- Quran data is bundled with the app
- No internet required for verse selection
- Data loaded from local assets using Expo Asset API

### Network-Aware AI Analysis
- Checks network connectivity before API calls
- Graceful error handling for offline scenarios
- Secure local storage for API keys

### TypeScript Support
- Full type safety throughout the application
- Well-defined interfaces for data structures
- Better development experience and fewer runtime errors

## Important Notes

- **Religious Guidance**: AI analysis is provided for reflection purposes only and should not be considered a definitive religious ruling
- **Data Sources**: Quranic texts are provided by Tanzil.net with English translation by Ali Quli Qarai
- **Privacy**: API calls to Google's Gemini are made only when the user explicitly requests AI analysis
- **Offline First**: The core functionality works completely offline
- **Cross-Platform**: Runs on iOS, Android, and web browsers

## Troubleshooting

### Common Issues

1. **App won't start**: Make sure all dependencies are installed with `npm install`
2. **Can't load Quran data**: Check that asset files are in the correct location
3. **AI analysis not working**: Verify your API key and internet connection
4. **Build failures**: Ensure you have the correct development environment set up

### Support

For issues specific to this app, please check the console logs and ensure:
- All dependencies are properly installed
- Asset files are present in `assets/data/`
- Network connectivity for AI features

## Disclaimer

This application is designed to assist in the practice of Istikhara through reflection on Quranic verses. The AI-generated analysis should be used as a tool for contemplation and not as a substitute for proper Islamic scholarship or consultation with qualified religious authorities.
