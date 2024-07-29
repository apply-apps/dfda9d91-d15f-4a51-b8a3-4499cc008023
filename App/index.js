// Filename: index.js
// Combined code from all files

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTxYcfUPH0QArff5dAWm0b6Hl-88a9sI4xf1TkG7VZTayrGUTvzPtJB0huoaIAdLz/pub?output=csv';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(GOOGLE_SHEET_URL)
      .then((response) => {
        const rows = response.data.split('\n').slice(1); // Skip header row
        const todoData = rows.map((row) => {
          const [id, task, status] = row.split(',');
          return { id, task, status };
        });
        setTodos(todoData);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {todos.map(todo => (
            <View key={todo.id} style={styles.todoItem}>
              <Text style={styles.todoText}>{todo.task}</Text>
              <Text style={styles.todoStatus}>{todo.status}</Text>
            </View>
          ))}
        </ScrollView>
      )}
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