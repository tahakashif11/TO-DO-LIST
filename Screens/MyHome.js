// MyHome.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTask,
  deleteTask,
  toggleComplete,
  editTask,
  setSearchQuery,
  setShowCompleteTasks,
  setShowIncompleteTasks,
} from '../taskSlice';
import { StyleSheet, Text, View, TextInput, Button,KeyboardAvoidingView,
  ScrollView, Platform } from 'react-native';

const MyHome = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const showCompleteTasks = useSelector((state) => state.tasks.showCompleteTasks);
  const showIncompleteTasks = useSelector((state) => state.tasks.showIncompleteTasks);
  const searchQuery = useSelector((state) => state.tasks.searchQuery);
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');


  const filteredTasks = tasks.filter((task) => {
    if (showCompleteTasks && showIncompleteTasks) {
      return true;
    } else if (showCompleteTasks) {
      return task.completed;
    } else if (showIncompleteTasks) {
      return !task.completed;
    } else {
      return true;
    }
  });

  const searchedTasks = filteredTasks.filter((task) =>
    task.text.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addTaskHandler = () => {
    if (newTask.trim() !== '') {
      dispatch(addTask(newTask));
      setNewTask('');
    }
  };

  const deleteTaskHandler = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const toggleCompleteHandler = (taskId) => {
    dispatch(toggleComplete(taskId));
  };

  const editTaskHandler = (taskToEdit, editedText) => {
    dispatch(editTask({ id: taskToEdit.id, text: editedText }));
    setEditingTask(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 10}
    >
   
    <View style={styles.container}>
      <Text style={styles.title}>Todo-App</Text>

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
        <Button
          title="All"
          onPress={() => {
            dispatch(setShowCompleteTasks(false));
            dispatch(setShowIncompleteTasks(false));
          }}
        />
        <Button
          title="Complete"
          onPress={() => {
            dispatch(setShowCompleteTasks(true));
            dispatch(setShowIncompleteTasks(false));
          }}
        />
        <Button
          title="Incomplete"
          onPress={() => {
            dispatch(setShowCompleteTasks(false));
            dispatch(setShowIncompleteTasks(true));
          }}
        />
      </View>

      <Text style={styles.subtitle}>Tasks:</Text>

      
      <ScrollView>
        {searchedTasks.map((task) => (
  <View key={task.id} style={styles.taskItem}>
    {editingTask === task.id ? (
      <View style={styles.editContainer}>
      <TextInput
      style={styles.editInput}
      onChangeText={(text) => setEditedTaskText(text)} // Update edited text
      value={editedTaskText} // Use editedTaskText for input value
    />
    <Button title="Save" onPress={() => editTaskHandler(task, editedTaskText)} />

      </View>
    ) : (
      <>
        <Text style={task.completed ? styles.completedTask : styles.taskText}>
          {task.text ? task.text : ''} {/* Add a check for task.text */}
        </Text>
        {!task.completed && (
          <>
          <Button
          title="Edit"
          onPress={() => {
            setEditedTaskText(task.text); // Set the edited text
            setEditingTask(task.id); // Open edit mode
          }}
        />
            <Button title="Complete" onPress={() => toggleCompleteHandler(task.id)} />
          </>
        )}
      </>
    )}
    <Button title="Delete" onPress={() => deleteTaskHandler(task.id)} />
  </View>
))}

      </ScrollView>
    </View>
    </KeyboardAvoidingView>
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
