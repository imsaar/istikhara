export interface Verse {
  number: number;
  surahNumber: number;
  ayahNumber: number;
  arabicText: string;
  englishTranslation: string;
}

export interface AIAnalysis {
  verdict: 'Good' | 'Not Good' | 'Neutral';
  analysis: string;
}

export type VerdictStyle = 'verdict-good' | 'verdict-not-good' | 'verdict-neutral';