// Filename: index.js
// Combined code from all files

import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';

const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQmGEnVX1VcmSEsEMdFfek1UVGcFMBCbHBJO5J2aWxD1fhEfND7ML-ejW3Liv7f6C3oHfdVr19eikQk/pub?output=csv';

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

  const toggleTodoStatus = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, status: todo.status === 'completed' ? 'pending' : 'completed' } : todo
      )
    );
  };

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
          <TouchableOpacity key={todo.id} style={styles.todoItem} onPress={() => toggleTodoStatus(todo.id)}>
            <Text style={styles.todoText}>{todo.task}</Text>
            <Text style={[styles.todoStatus, { color: todo.status === 'completed' ? 'green' : 'red' }]}>
              {todo.status}
            </Text>
          </TouchableOpacity>
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
  },
});