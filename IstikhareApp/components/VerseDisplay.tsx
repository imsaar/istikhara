import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Verse } from '../types';

interface VerseDisplayProps {
  verse: Verse;
}

export default function VerseDisplay({ verse }: VerseDisplayProps) {
  const handleTanzilLink = () => {
    const tanzilUrl = `https://tanzil.net/#${verse.surahNumber}:${verse.ayahNumber}`;
    Linking.openURL(tanzilUrl);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selected Verse Number:</Text>
        <Text style={styles.verseNumber}>
          {verse.number} (Surah {verse.surahNumber}, Ayat {verse.ayahNumber})
        </Text>
        <TouchableOpacity onPress={handleTanzilLink} style={styles.linkContainer}>
          <Text style={styles.link}>📖 View on Tanzil.net</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Arabic Verse (آية):</Text>
        <Text style={styles.arabicText}>{verse.arabicText}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>English Translation:</Text>
        <Text style={styles.englishText}>{verse.englishTranslation}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4C1D95',
    marginBottom: 8,
  },
  verseNumber: {
    fontSize: 16,
    color: '#374151',
    backgroundColor: '#EEF2FF',
    padding: 12,
    borderRadius: 8,
  },
  linkContainer: {
    marginTop: 8,
  },
  link: {
    color: '#4C1D95',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  arabicText: {
    fontSize: 20,
    lineHeight: 36,
    color: '#374151',
    backgroundColor: '#EEF2FF',
    padding: 16,
    borderRadius: 8,
    textAlign: 'right',
    fontFamily: 'System', // Will use system Arabic font
  },
  englishText: {
    fontSize: 16,
    color: '#374151',
    fontStyle: 'italic',
    backgroundColor: '#EEF2FF',
    padding: 12,
    borderRadius: 8,
    lineHeight: 24,
  },
});