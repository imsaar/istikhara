import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoadingSpinner() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4C1D95" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});