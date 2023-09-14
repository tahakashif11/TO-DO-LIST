import React, { useState, memo } from 'react'; // Import memo
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  ScrollView, Platform
} from 'react-native';



// Wrap TaskItem with memo
const TaskItem = memo(({ item, editingIndex, editedTask, setEditedTask, setEditingIndex, toggleComplete, deleteTask, editTask }) => {
  return (
    <View style={styles.taskItem}>
      {editingIndex === item.id ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            onChangeText={(text) => setEditedTask(text)}
            value={editedTask}
          />
          <Button title="Save" onPress={editTask} />
        </View>
      ) : (
        <>
          <Text
            style={
              item.completed ? styles.completedTask : styles.taskText
            }
          >
            {item.text}
          </Text>
          {!item.completed && (
            <>
              <Button
                title="Edit"
                onPress={() => {
                  setEditingIndex(item.id);
                  setEditedTask(item.text);
                }}
              />
              <Button
                title="Complete"
                onPress={() => toggleComplete(item.id)}
              />
            </>
          )}
        </>
      )}
      <Button title="Delete" onPress={() => deleteTask(item.id)} />
    </View>
  );
});

const MyHome = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompleteTasks, setShowCompleteTasks] = useState(false);
  const [showIncompleteTasks, setShowIncompleteTasks] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState('');
  const [nextId, setNextId] = useState(1);

  const addTask = () => {
    if (task.trim() !== '') {
      const newTask = { text: task, completed: false, id: nextId };
      setTasks([...tasks, newTask]);
      setNextId(nextId + 1);
      setTask('');
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((item) => item.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = tasks.map((item) =>
      item.id === taskId ? { ...item, completed: !item.completed } : item
    );
    setTasks(updatedTasks);
  };

  const editTask = () => {
    if (editedTask.trim() !== '') {
      const updatedTasks = tasks.map((item) =>
        item.id === editingIndex ? { ...item, text: editedTask } : item
      );
      setTasks(updatedTasks);
      setEditingIndex(null);
      setEditedTask('');
    }
  };

  const filterTasks = () => {
    let tasksToDisplay = tasks;

    if (showCompleteTasks) {
      tasksToDisplay = tasksToDisplay.filter((item) => item.completed);
    }

    if (showIncompleteTasks) {
      tasksToDisplay = tasksToDisplay.filter((item) => !item.completed);
    }

    return tasksToDisplay.filter((item) =>
      item.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />

        <TextInput
          style={styles.input}
          placeholder="ADD"
          onChangeText={(text) => {
            setTask(text);
          }}
          value={task}
        />

        <Button title="Add Task" onPress={addTask} />

        <View style={styles.buttonContainer}>
          <Button
            title="All"
            onPress={() => {
              setShowCompleteTasks(false);
              setShowIncompleteTasks(false);
            }}
          />

          <Button
            title="Complete"
            onPress={() => {
              setShowCompleteTasks(true);
              setShowIncompleteTasks(false);
            }}
          />

          <Button
            title="Incomplete"
            onPress={() => {
              setShowCompleteTasks(false);
              setShowIncompleteTasks(true);
            }}
          />
        </View>

        <Text style={styles.subtitle}>Tasks:</Text>
        <ScrollView>
  {filterTasks().map((item) => (
    <TaskItem
      key={item.id.toString()}
      item={item}
      editingIndex={editingIndex}
      editedTask={editedTask}
      setEditedTask={setEditedTask}
      setEditingIndex={setEditingIndex}
      toggleComplete={toggleComplete}
      deleteTask={deleteTask}
      editTask={editTask}
    />
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
  buttonContainer: {
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
  }
});

export default MyHome;