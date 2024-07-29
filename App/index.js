// Filename: index.js
// Combined code from all files

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

const GOOGLE_SHEET_ID = '1MV6_Umdyryf5FLxReik_mJFH-5fIJWUJxkvbP_GrSco';
const GOOGLE_SHEET_API_KEY = 'YOUR_GOOGLE_SHEET_API_KEY'; // Replace with your actual API key
const SHEET_NAME = 'Sheet1'; // Change according to your sheet name

const getGoogleSheetUrl = (sheetId, apiKey, sheetName) => {
  return `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;
};

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = getGoogleSheetUrl(GOOGLE_SHEET_ID, GOOGLE_SHEET_API_KEY, SHEET_NAME);
        const response = await axios.get(url);

        const rows = response.data.values.slice(1); // Skip the header row
        const todoData = rows.map((row, index) => {
          const [task, status] = row;
          return { id: index.toString(), task, status };
        });

        setTodos(todoData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
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