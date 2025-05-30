import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

import { Verse, AIAnalysis } from './types';
import QuranService from './services/QuranService';
import AIService from './services/AIService';
import VerseDisplay from './components/VerseDisplay';
import AIAnalysisDisplay from './components/AIAnalysisDisplay';
import LoadingSpinner from './components/LoadingSpinner';

const STORAGE_KEY = 'GEMINI_API_KEY';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [error, setError] = useState<string>('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    setIsLoading(true);
    try {
      await QuranService.loadQuranData();
      setDataReady(true);
      
      // Load saved API key
      const savedApiKey = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedApiKey) {
        AIService.setApiKey(savedApiKey);
      }
    } catch (error) {
      setError('Failed to load Quran data. Please restart the app.');
      console.error('App initialization error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const performIstikhara = async () => {
    if (!dataReady) {
      setError('Quran data is not loaded yet. Please wait.');
      return;
    }

    setIsLoading(true);
    setError('');
    setAiAnalysis(null);

    try {
      const verse = QuranService.getRandomVerse();
      setCurrentVerse(verse);
    } catch (error) {
      setError('Error generating verse. Please try again.');
      console.error('Istikhara error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAIAnalysis = async () => {
    if (!currentVerse) {
      setError('No verse selected. Please perform Istikhara first.');
      return;
    }

    setIsAILoading(true);
    setError('');

    try {
      const analysis = await AIService.performAnalysis(currentVerse.englishTranslation);
      setAiAnalysis(analysis);
    } catch (error: any) {
      if (error.message.includes('API key')) {
        setShowApiKeyModal(true);
      } else {
        setError(`AI Analysis Error: ${error.message}`);
      }
      console.error('AI Analysis error:', error);
    } finally {
      setIsAILoading(false);
    }
  };

  const saveApiKey = async () => {
    if (!apiKeyInput.trim()) {
      Alert.alert('Error', 'Please enter a valid API key');
      return;
    }

    try {
      await AsyncStorage.setItem(STORAGE_KEY, apiKeyInput.trim());
      AIService.setApiKey(apiKeyInput.trim());
      setApiKeyInput('');
      setShowApiKeyModal(false);
      Alert.alert('Success', 'API key saved successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to save API key');
      console.error('Save API key error:', error);
    }
  };

  if (!dataReady && isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.centerContainer}>
          <LoadingSpinner />
          <Text style={styles.loadingText}>Loading Quran data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Quranic Istikhara</Text>
          <Text style={styles.subtitle}>
            Seek guidance by reflecting on a randomly selected Quranic verse.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={performIstikhara}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Loading...' : 'Perform Istikhara'}
            </Text>
          </TouchableOpacity>
        </View>

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}

        {currentVerse && !isLoading && (
          <View style={styles.resultContainer}>
            <VerseDisplay verse={currentVerse} />
            
            {!aiAnalysis && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={handleAIAnalysis}
                  disabled={isAILoading}
                >
                  <Text style={styles.secondaryButtonText}>
                    {isAILoading ? 'Analyzing...' : 'Get AI Analysis & Verdict'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {isAILoading && <LoadingSpinner />}

            {aiAnalysis && <AIAnalysisDisplay analysis={aiAnalysis} />}
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2025 Istikhara App. Quranic texts provided by Tanzil.net and translation by Ali Quli Qarai.
          </Text>
          <Text style={styles.footerText}>
            AI analysis is for reflection and not a definitive religious ruling.
          </Text>
          <TouchableOpacity
            style={styles.apiKeyButton}
            onPress={() => setShowApiKeyModal(true)}
          >
            <Text style={styles.apiKeyButtonText}>Configure API Key</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showApiKeyModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowApiKeyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Configure Gemini API Key</Text>
            <Text style={styles.modalSubtitle}>
              Enter your Google Gemini API key to enable AI analysis feature.
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your Gemini API key"
              value={apiKeyInput}
              onChangeText={setApiKeyInput}
              secureTextEntry={true}
              multiline={false}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setShowApiKeyModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={saveApiKey}
              >
                <Text style={styles.modalSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FF',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4C1D95',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  primaryButton: {
    backgroundColor: '#4C1D95',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    color: '#DC2626',
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 14,
  },
  resultContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  apiKeyButton: {
    marginTop: 16,
    padding: 8,
  },
  apiKeyButtonText: {
    color: '#4C1D95',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancelButton: {
    flex: 1,
    padding: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#6B7280',
    fontWeight: '600',
  },
  modalSaveButton: {
    flex: 1,
    padding: 12,
    marginLeft: 8,
    backgroundColor: '#4C1D95',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalSaveText: {
    color: 'white',
    fontWeight: '600',
  },
});