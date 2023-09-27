// import React, { useState, memo } from 'react'; // Import memo
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
//   KeyboardAvoidingView,
//   ScrollView, Platform
// } from 'react-native';



// // Wrap TaskItem with memo
// const TaskItem = memo(({ item, editingIndex, editedTask, setEditedTask, setEditingIndex, toggleComplete, deleteTask, editTask }) => {
//   return (
//     <View style={styles.taskItem}>
//       {editingIndex === item.id ? (
//         <View style={styles.editContainer}>
//           <TextInput
//             style={styles.editInput}
//             onChangeText={(text) => setEditedTask(text)}
//             value={editedTask}
//           />
//           <Button title="Save" onPress={editTask} />
//         </View>
//       ) : (
//         <>
//           <Text
//             style={
//               item.completed ? styles.completedTask : styles.taskText
//             }
//           >
//             {item.text}
//           </Text>
//           {!item.completed && (
//             <>
//               <Button
//                 title="Edit"
//                 onPress={() => {
//                   setEditingIndex(item.id);
//                   setEditedTask(item.text);
//                 }}
//               />
//               <Button
//                 title="Complete"
//                 onPress={() => toggleComplete(item.id)}
//               />
//             </>
//           )}
//         </>
//       )}
//       <Button title="Delete" onPress={() => deleteTask(item.id)} />
//     </View>
//   );
// });

// const MyHome = () => {
//   const [task, setTask] = useState('');
//   const [tasks, setTasks] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showCompleteTasks, setShowCompleteTasks] = useState(false);
//   const [showIncompleteTasks, setShowIncompleteTasks] = useState(false);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editedTask, setEditedTask] = useState('');
//   const [nextId, setNextId] = useState(1);

//   const addTask = () => {
//     if (task.trim() !== '') {
//       const newTask = { text: task, completed: false, id: nextId };
//       setTasks([...tasks, newTask]);
//       setNextId(nextId + 1);
//       setTask('');
//     }
//   };

//   const deleteTask = (taskId) => {
//     const updatedTasks = tasks.filter((item) => item.id !== taskId);
//     setTasks(updatedTasks);
//   };

//   const toggleComplete = (taskId) => {
//     const updatedTasks = tasks.map((item) =>
//       item.id === taskId ? { ...item, completed: !item.completed } : item
//     );
//     setTasks(updatedTasks);
//   };

//   const editTask = () => {
//     if (editedTask.trim() !== '') {
//       const updatedTasks = tasks.map((item) =>
//         item.id === editingIndex ? { ...item, text: editedTask } : item
//       );
//       setTasks(updatedTasks);
//       setEditingIndex(null);
//       setEditedTask('');
//     }
//   };

//   const filterTasks = () => {
//     let tasksToDisplay = tasks;

//     if (showCompleteTasks) {
//       tasksToDisplay = tasksToDisplay.filter((item) => item.completed);
//     }

//     if (showIncompleteTasks) {
//       tasksToDisplay = tasksToDisplay.filter((item) => !item.completed);
//     }

//     return tasksToDisplay.filter((item) =>
//       item.text.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : null}
//       keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 10}
//     >
//       <View style={styles.container}>
//         <Text style={styles.title}>Todo-App</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Search"
//           onChangeText={(text) => setSearchQuery(text)}
//           value={searchQuery}
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="ADD"
//           onChangeText={(text) => {
//             setTask(text);
//           }}
//           value={task}
//         />

//         <Button title="Add Task" onPress={addTask} />

//         <View style={styles.buttonContainer}>
//           <Button
//             title="All"
//             onPress={() => {
//               setShowCompleteTasks(false);
//               setShowIncompleteTasks(false);
//             }}
//           />

//           <Button
//             title="Complete"
//             onPress={() => {
//               setShowCompleteTasks(true);
//               setShowIncompleteTasks(false);
//             }}
//           />

//           <Button
//             title="Incomplete"
//             onPress={() => {
//               setShowCompleteTasks(false);
//               setShowIncompleteTasks(true);
//             }}
//           />
//         </View>

//         <Text style={styles.subtitle}>Tasks:</Text>
//         <ScrollView>
//   {filterTasks().map((item) => (
//     <TaskItem
//       key={item.id.toString()}
//       item={item}
//       editingIndex={editingIndex}
//       editedTask={editedTask}
//       setEditedTask={setEditedTask}
//       setEditingIndex={setEditingIndex}
//       toggleComplete={toggleComplete}
//       deleteTask={deleteTask}
//       editTask={editTask}
//     />
//   ))}
// </ScrollView>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 8,
//     marginBottom: 8,
//   },
//   editInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 8,
//     marginBottom: 8,
//     flex: 1,
//   },
//   buttonContainer: {
//     paddingTop: 8,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 16,
//   },
//   taskItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   taskText: {
//     flex: 1,
//     fontSize: 16,
//   },
//   completedTask: {
//     fontSize: 16,
//     textDecorationLine: 'line-through',
//     color: 'gray',
//     flex: 1,
//   },
//   editContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   }
// });

// export default MyHome;
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { View, Text, ActivityIndicator } from 'react-native';
// import { fetchUserProfile } from '../redux/profileSlice';

// const Profile = () => {
//   const dispatch = useDispatch();
//   const userId = useSelector((state) => state.auth.authToken);
//   const userData = useSelector((state) => state.profile.userData);
//   const loading = useSelector((state) => state.profile.loading);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await dispatch(fetchUserProfile(userId));
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     if (userId) {
//       fetchData();
//     }
//   }, [dispatch, userId]);

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       {loading ? (
//         <ActivityIndicator size="large" color="blue" />
//       ) : userData ? (
//         <View>
//           <Text>Name: {userData.username}</Text>
//           <Text>Email: {userData.email}</Text>
//           <Text>Weight: {userData.weight} kg</Text>
//           {/* Add more user details as needed */}
//         </View>
//       ) : (
//         <Text>No user data available.</Text>
//       )}
//     </View>
//   );
// };

// export default Profile;
// import { StyleSheet, Text, View, Image, ImageBackground, ActivityIndicator } from 'react-native';
// import React, { useEffect, useState } from 'react'; 
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserProfile } from '../redux/profileSlice';

// const Profile = () => {
//   const dispatch = useDispatch();
//   const userId = useSelector((state) => state.auth.authToken); 
//   console.log('yes'+userId)
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         dispatch(fetchUserProfile(userId));
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchData(); // Call the async function inside useEffect
//   }, [dispatch, userId]); // Dependencies array for useEffect

//   const userData = useSelector((state) => state.profile.userData);
//   console.log(userData)
//   const loading = useSelector((state) => state.profile.loading);

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="blue" />
//       ) : userData ? (
//         <ImageBackground
//           source={{
//             uri: userData.image,
//           }}
//           style={styles.imageBackground}
//         >
//           <View style={styles.overlay}>
//             <Text style={styles.nameText}>Name: {userData.firstName}</Text>
//             <Text style={styles.emailText}>Email: {userData.email}</Text>
//             <Text style={styles.weightText}>Weight: {userData.weight} kg</Text>
//           </View>
//         </ImageBackground>
//       ) : (
//         <Text>Loading user data...</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'mintcream',
//   },
//   imageBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   overlay: {
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     padding: 20,
//     borderRadius: 10,
//   },
//   nameText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   emailText: {
//     fontSize: 18,
//     color: 'black',
//   },
//   weightText: {
//     fontSize: 18,
//     color: 'black',
//   },
// });





// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
//   ScrollView,
//   Keyboard,
//   TouchableOpacity,
// } from 'react-native';

// import firestore from '@react-native-firebase/firestore';
// import { useDispatch, useSelector } from 'react-redux';

// const MyHome = () => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState('');
//   const [editingTask, setEditingTask] = useState(null);
//   const [editedTaskText, setEditedTaskText] = useState('');
//   const [activeFilter, setActiveFilter] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const tasksCollection = firestore().collection('tasks');
//   const userId = useSelector((state) => state.auth.authToken);


//   useEffect(() => {
//     const unsubscribe = tasksCollection
//       .where('userId', '==', userId) // Query by user ID
//       .onSnapshot((querySnapshot) => {
//         const updatedTasks = [];
//         querySnapshot.forEach((documentSnapshot) => {
//           updatedTasks.push({
//             id: documentSnapshot.id,
//             ...documentSnapshot.data(),
//           });
//         });
//         setTasks(updatedTasks);
//       });
  
//     return () => unsubscribe();
//   }, [userId]); 

//   const addTaskHandler = () => {
//     if (newTask.trim() !== '') {
//       tasksCollection.add({
//         text: newTask,
//         completed: false,
//         userId: userId, // Include the user's ID
//       });
//       setNewTask('');
//       Keyboard.dismiss();
//     }
//   };

//   const deleteTaskHandler = (taskId) => {
//     tasksCollection.doc(taskId).delete();
//   };

//   const toggleCompleteHandler = (taskId) => {
//     const task = tasks.find((t) => t.id === taskId);
//     if (task) {
//       tasksCollection.doc(taskId).update({ completed: !task.completed });
//     }
//   };

//   const editTaskHandler = (taskToEdit, editedText) => {
//     tasksCollection.doc(taskToEdit.id).update({ text: editedText });
//     setEditingTask(null);
//   };

//   const applyFilter = (filter) => {
//     setActiveFilter(filter);
//   };

//   const filteredTasks = tasks.filter((task) => {
//     if (activeFilter === 'Complete') {
//       return task.completed;
//     } else if (activeFilter === 'Incomplete') {
//       return !task.completed;
//     } else {
//       return true;
//     }
//   });

//   const searchedTasks = filteredTasks.filter((task) =>
//     task.text.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Hello</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Search"
//         onChangeText={(text) => setSearchQuery(text)}
//         value={searchQuery}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Add Task"
//         onChangeText={(text) => setNewTask(text)}
//         value={newTask}
//       />
//       <Button title="Add Task" onPress={addTaskHandler} />

//       <View style={styles.filterContainer}>
//         <TouchableOpacity
//           style={[styles.filterButton, activeFilter === 'All' && styles.activeFilter]}
//           onPress={() => applyFilter('All')}
//         >
//           <Text style={styles.filterButtonText}>All</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.filterButton, activeFilter === 'Complete' && styles.activeFilter]}
//           onPress={() => applyFilter('Complete')}
//         >
//           <Text style={styles.filterButtonText}>Complete</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.filterButton, activeFilter === 'Incomplete' && styles.activeFilter]}
//           onPress={() => applyFilter('Incomplete')}
//         >
//           <Text style={styles.filterButtonText}>Incomplete</Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.subtitle}>Tasks:</Text>

//       <ScrollView>
//         {searchedTasks.map((task) => (
//           <View key={task.id} style={styles.taskItem}>
//             {editingTask === task.id ? (
//               <View style={styles.editContainer}>
//                 <TextInput
//                   style={styles.editInput}
//                   onChangeText={(text) => setEditedTaskText(text)}
//                   value={editedTaskText}
//                 />
//                 <Button
//                   title="Save"
//                   onPress={() => editTaskHandler(task, editedTaskText)}
//                 />
//               </View>
//             ) : (
//               <>
//                 <Text
//                   style={task.completed ? styles.completedTask : styles.taskText}
//                 >
//                   {task.text ? task.text : ''}
//                 </Text>
//                 {!task.completed && (
//                   <>
//                     <Button
//                       title="Edit"
//                       onPress={() => {
//                         setEditedTaskText(task.text);
//                         setEditingTask(task.id);
//                       }}
//                     />
//                     <Button
//                       title="Complete"
//                       onPress={() => toggleCompleteHandler(task.id)}
//                     />
//                   </>
//                 )}
//               </>
//             )}
//             <Button
//               title="Delete"
//               onPress={() => deleteTaskHandler(task.id)}
//             />
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 8,
//     marginBottom: 8,
//   },
//   editInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 8,
//     marginBottom: 8,
//     flex: 1,
//   },
//   filterContainer: {
//     paddingTop: 8,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   filterButton: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//     padding: 8,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   filterButtonText: {
//     fontSize: 16,
//   },
//   activeFilter: {
//     backgroundColor: '#3498db',
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 16,
//   },
//   taskItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   taskText: {
//     flex: 1,
//     fontSize: 16,
//   },
//   completedTask: {
//     fontSize: 16,
//     textDecorationLine: 'line-through',
//     color: 'gray',
//     flex: 1,
//   },
//   editContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
// });

// export default MyHome;
