
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {  useSelector } from 'react-redux';
import homestyles from '../styles/stylesscreenMyHome';

const MyHome = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const tasksCollection = firestore().collection('tasks');
  const userId = useSelector((state) => state.auth.authToken);


  useEffect(() => {
    const unsubscribe = tasksCollection
      .where('userId', '==', userId) 
      .onSnapshot((querySnapshot) => {
        const updatedTasks = [];
        querySnapshot.forEach((documentSnapshot) => {
          updatedTasks.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        setTasks(updatedTasks);
      });
  
    return () => unsubscribe();
  }, [userId]); 

  const addTaskHandler = () => {
    if (newTask.trim() !== '') {
      tasksCollection.add({
        text: newTask,
        completed: false,
        userId: userId, 
      });
      setNewTask('');
      Keyboard.dismiss();
    }
  };

  const deleteTaskHandler = (taskId) => {
    tasksCollection.doc(taskId).delete();
  };

  const toggleCompleteHandler = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      tasksCollection.doc(taskId).update({ completed: !task.completed });
    }
  };

  const editTaskHandler = (taskToEdit, editedText) => {
    tasksCollection.doc(taskToEdit.id).update({ text: editedText });
    setEditingTask(null);
  };

  const applyFilter = (filter) => {
    setActiveFilter(filter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === 'Complete') {
      return task.completed;
    } else if (activeFilter === 'Incomplete') {
      return !task.completed;
    } else {
      return true;
    }
  });

  const searchedTasks = filteredTasks.filter((task) =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={homestyles.container}>
      <Text style={homestyles.title}>Hello</Text>

      <TextInput
        style={homestyles.input}
        placeholder="Search"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />

      <TextInput
        style={homestyles.input}
        placeholder="Add Task"
        onChangeText={(text) => setNewTask(text)}
        value={newTask}
      />
      <Button title="Add Task" onPress={addTaskHandler} />

      <View style={homestyles.filterContainer}>
        <TouchableOpacity
          style={[homestyles.filterButton, activeFilter === 'All' && homestyles.activeFilter]}
          onPress={() => applyFilter('All')}
        >
          <Text style={homestyles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[homestyles.filterButton, activeFilter === 'Complete' && homestyles.activeFilter]}
          onPress={() => applyFilter('Complete')}
        >
          <Text style={homestyles.filterButtonText}>Complete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[homestyles.filterButton, activeFilter === 'Incomplete' && homestyles.activeFilter]}
          onPress={() => applyFilter('Incomplete')}
        >
          <Text style={homestyles.filterButtonText}>Incomplete</Text>
        </TouchableOpacity>
      </View>

      <Text style={homestyles.subtitle}>Tasks:</Text>

      <ScrollView>
        {searchedTasks.map((task) => (
          <View key={task.id} style={homestyles.taskItem}>
            {editingTask === task.id ? (
              <View style={homestyles.editContainer}>
                <TextInput
                  style={homestyles.editInput}
                  onChangeText={(text) => setEditedTaskText(text)}
                  value={editedTaskText}
                />
                <Button
                  title="Save"
                  onPress={() => editTaskHandler(task, editedTaskText)}
                />
              </View>
            ) : (
              <>
                <Text
                  style={task.completed ? homestyles.completedTask : homestyles.taskText}
                >
                  {task.text ? task.text : ''}
                </Text>
                {!task.completed && (
                  <>
                    <Button
                      title="Edit"
                      onPress={() => {
                        setEditedTaskText(task.text);
                        setEditingTask(task.id);
                      }}
                    />
                    <Button
                      title="Complete"
                      onPress={() => toggleCompleteHandler(task.id)}
                    />
                  </>
                )}
              </>
            )}
            <Button
              title="Delete"
              onPress={() => deleteTaskHandler(task.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};


export default MyHome;
