import { quranUthmaniData, englishTranslationData } from '../assets/data/QuranData';
import { Verse } from '../types';

class QuranService {
  private quranUthmaniLines: string[] = [];
  private englishTranslationLines: string[] = [];
  private isDataLoaded = false;

  async loadQuranData(): Promise<void> {
    if (this.isDataLoaded) return;

    try {
      // Load data from embedded JavaScript module
      this.quranUthmaniLines = quranUthmaniData.split(/\r?\n/);
      this.englishTranslationLines = englishTranslationData.split(/\r?\n/);
      this.isDataLoaded = true;
    } catch (error) {
      console.error('Error loading Quran data:', error);
      throw new Error('Failed to load Quran data');
    }
  }

  getRandomVerse(): Verse {
    if (!this.isDataLoaded) {
      throw new Error('Quran data not loaded. Call loadQuranData() first.');
    }

    const randomNumber = Math.floor(Math.random() * 6236) + 1;
    const arrayIndex = randomNumber - 1;

    const arabicVerse = this.quranUthmaniLines[arrayIndex] || "Verse not found.";
    const englishVerse = this.englishTranslationLines[arrayIndex] || "Translation not found.";

    // Parse surah and ayat numbers from Arabic verse
    let surahNumber = 1;
    let ayahNumber = 1;
    let arabicText = arabicVerse;

    if (arabicVerse && arabicVerse.includes('|')) {
      const parts = arabicVerse.split('|');
      if (parts.length >= 3) {
        surahNumber = parseInt(parts[0]) || 1;
        ayahNumber = parseInt(parts[1]) || 1;
        arabicText = parts.slice(2).join('|');
      }
    }

    return {
      number: randomNumber,
      surahNumber,
      ayahNumber,
      arabicText,
      englishTranslation: englishVerse,
    };
  }

  isReady(): boolean {
    return this.isDataLoaded;
  }
}

export default new QuranService();