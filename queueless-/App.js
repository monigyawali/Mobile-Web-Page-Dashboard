import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Dashboard from './Dashboard';

const safeAreaStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
});

export default function App() {
  return (
    <SafeAreaView style={safeAreaStyle.container}>
      {/* Ensures the status bar text is legible against the light background */}
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />
      <Dashboard />
    </SafeAreaView>
  );
}
