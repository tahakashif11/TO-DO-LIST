// MyHome.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Keyboard, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { setTasks, setActiveFilter, setSearchQuery, addTask, deleteTask, toggleComplete, editTask } from '../redux/taskSlice';

const MyHome = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const activeFilter = useSelector((state) => state.tasks.activeFilter);
  const searchQuery = useSelector((state) => state.tasks.searchQuery);
  const userId = useSelector((state) => state.auth.authToken);
  const tasksCollection = firestore().collection('tasks');
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

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
        dispatch(setTasks(updatedTasks));
      });

    return () => unsubscribe();
  }, [dispatch, userId]);

  const addTaskHandler = () => {
    if (newTask.trim() !== '') {
      const taskToAdd = {
        text: newTask,
        completed: false,
        userId: userId,
      };
      tasksCollection.add(taskToAdd);
      dispatch(addTask(taskToAdd));
      setNewTask('');
      Keyboard.dismiss();
    }
  };

  const deleteTaskHandler = (taskId) => {
    tasksCollection.doc(taskId).delete();
    dispatch(deleteTask(taskId));
  };

  const toggleCompleteHandler = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      tasksCollection.doc(taskId).update({ completed: !task.completed });
      dispatch(toggleComplete(taskId));
    }
  };

  const editTaskHandler = (taskToEdit, editedText) => {
    tasksCollection.doc(taskToEdit.id).update({ text: editedText });
    dispatch(editTask({ id: taskToEdit.id, text: editedText }));
    setEditingTask(null);
  };

  const applyFilter = (filter) => {
    dispatch(setActiveFilter(filter));
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
    <View style={styles.container}>
      <Text style={styles.title}>Hello</Text>

      <TextInput
        style={styles.input}
        placeholder="Search"
        onChangeText={(text) => dispatch(setSearchQuery(text))}
        value={searchQuery}
      />

      <TextInput
        style={styles.input}
        placeholder="Add Task"
        onChangeText={(text) => setNewTask(text)}
        value={newTask}
      />
      <Button title="Add Task" onPress={addTaskHandler} />

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'All' && styles.activeFilter]}
          onPress={() => applyFilter('All')}
        >
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'Complete' && styles.activeFilter]}
          onPress={() => applyFilter('Complete')}
        >
          <Text style={styles.filterButtonText}>Complete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'Incomplete' && styles.activeFilter]}
          onPress={() => applyFilter('Incomplete')}
        >
          <Text style={styles.filterButtonText}>Incomplete</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Tasks:</Text>

      <ScrollView>
        {searchedTasks.map((task) => (
          <View key={task.id} style={styles.taskItem}>
            {editingTask === task.id ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.editInput}
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
                  style={task.completed ? styles.completedTask : styles.taskText}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
    flex: 1,
  },
  filterContainer: {
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 16,
  },
  activeFilter: {
    backgroundColor: '#3498db',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  completedTask: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'gray',
    flex: 1,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MyHome;
