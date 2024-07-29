// Filename: index.js
// Combined code from all files

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

// Static data extracted from Google Sheets
const TODOS = [
  { id: '1', task: 'Buy groceries', status: 'Pending' },
  { id: '2', task: 'Walk the dog', status: 'Completed' },
  { id: '3', task: 'Finish homework', status: 'Pending' },
  { id: '4', task: 'Call Mom', status: 'Pending' },
  { id: '5', task: 'Clean the house', status: 'Completed' }
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {TODOS.map(todo => (
          <View key={todo.id} style={styles.todoItem}>
            <Text style={styles.todoText}>{todo.task}</Text>
            <Text style={styles.todoStatus}>{todo.status}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  scrollContainer: {
    padding: 20,
  },
  todoItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  todoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoStatus: {
    fontSize: 14,
    color: '#888',
  },
});