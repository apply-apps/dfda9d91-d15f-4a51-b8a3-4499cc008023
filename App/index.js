// Filename: index.js
// Combined code from all files

import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

// Link to the published CSV Google Sheet
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTowGjknsfdNphbqoxgA-K6BpV6Gkffcb67qK8L_j_Hjj8_UBJvpmfOYq3ZY2qsF/pub?output=csv';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(GOOGLE_SHEET_URL)
      .then(response => {
        const rows = response.data.split('\n');
        const parsedTodos = rows.map(row => {
          const [id, task, status] = row.split(',');
          return { id, task, status: status.trim() };
        });
        setTodos(parsedTodos);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data from Google Sheet:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {todos.map(todo => (
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