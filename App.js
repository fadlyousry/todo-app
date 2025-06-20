import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import { styles } from './styles';





export default function App() {




  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');


  const handleAddTodo = () => {
    if (title.trim() === '' || description.trim() === '') return;

    const newTodo = {
      id: Date.now().toString(),
      title,
      description,
      done: false,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setDescription('');
  };


  const filteredTodos = todos.filter(todo => {
    if (filter === 'All') return true;
    if (filter === 'Active') return !todo.done;
    if (filter === 'Done') return todo.done;
  });


  return (

    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>TODO APP</Text>
      <TextInput placeholder='Enter Title' style={styles.input} value={title}
        onChangeText={setTitle} />
      <TextInput placeholder='Enter Discription' style={styles.input} value={description}
        onChangeText={setDescription} />
      <TouchableOpacity style={styles.submitBtn} activeOpacity={0.8} onPress={handleAddTodo}>
        <Text style={styles.text}>Save</Text>
      </TouchableOpacity>
      <View style={styles.dividerLine} />
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterBtn, filter === 'All' && styles.selectedFilter]}
          onPress={() => setFilter('All')}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, filter === 'Active' && styles.selectedFilter]}
          onPress={() => setFilter('Active')}>
          <Text style={styles.filterText}>Active</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterBtn, filter === 'Done' && styles.selectedFilter]}
          onPress={() => setFilter('Done')}>
          <Text style={styles.filterText}>Done</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.dividerLine} />

      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setTodos(todos.map(todo =>
                todo.id === item.id ? { ...todo, done: !todo.done } : todo
              ));
            }}
            style={styles.flatList}
          >
            <Text style={{ fontWeight: 'bold', textDecorationLine: item.done ? 'line-through' : 'none' }}>
              {item.title}
            </Text>
            <Text style={{ textDecorationLine: item.done ? 'line-through' : 'none' }}>
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
      />



    </View>
  );
}

