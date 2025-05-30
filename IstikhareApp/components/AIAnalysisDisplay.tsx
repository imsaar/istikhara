import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AIAnalysis, VerdictStyle } from '../types';

interface AIAnalysisDisplayProps {
  analysis: AIAnalysis;
}

export default function AIAnalysisDisplay({ analysis }: AIAnalysisDisplayProps) {
  const getVerdictStyle = (verdict: string): VerdictStyle => {
    switch (verdict) {
      case 'Good':
        return 'verdict-good';
      case 'Not Good':
        return 'verdict-not-good';
      default:
        return 'verdict-neutral';
    }
  };

  const verdictStyleType = getVerdictStyle(analysis.verdict);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Analysis & Verdict:</Text>
      <View style={[styles.verdictContainer, styles[verdictStyleType]]}>
        <Text style={[styles.verdictText, styles[`${verdictStyleType}Text`]]}>
          {analysis.verdict}
        </Text>
      </View>
      <Text style={styles.analysisText}>{analysis.analysis}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4C1D95',
    marginBottom: 12,
  },
  verdictContainer: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 12,
    alignItems: 'center',
  },
  verdictText: {
    fontSize: 18,
    fontWeight: '600',
  },
  'verdict-good': {
    backgroundColor: '#D1FAE5',
    borderColor: '#065F46',
  },
  'verdict-good-text': {
    color: '#065F46',
  },
  'verdict-not-good': {
    backgroundColor: '#FEE2E2',
    borderColor: '#991B1B',
  },
  'verdict-not-good-text': {
    color: '#991B1B',
  },
  'verdict-neutral': {
    backgroundColor: '#F3F4F6',
    borderColor: '#4B5563',
  },
  'verdict-neutral-text': {
    color: '#4B5563',
  },
  analysisText: {
    fontSize: 14,
    color: '#374151',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    lineHeight: 20,
  },
});