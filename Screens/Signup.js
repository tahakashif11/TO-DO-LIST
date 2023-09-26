import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [weight, setWeight] = useState('');
  const [profileImage, setProfileImage] = useState(null); // To store the selected profile image URI

  // Function to handle image selection from the gallery
  const handleImageSelect = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.error) {
        console.log(response.assets[0].uri)
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = async () => {
    // Check if any of the fields are empty or if the profile image is not selected
    if (!email || !username || !password || !weight || !profileImage) {
      Alert.alert('Error', 'Please fill in all fields and select a profile image');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Create a document in Firestore with the user's UID as the document ID
     

      // Upload the profile image to Firestore under the user's ID
      const imageRef = await firestore().collection('users').doc(user.uid);
      await imageRef.set({ 
        uri: profileImage ,
        username: username,
        email: email,
        weight: weight,
      });

      // User and profile image have been created successfully
      console.log('User created:', user.uid);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error here, e.g., show an error message to the user
      Alert.alert('Error', 'Error creating user. Please try again.');
    }
  };

  function handleback() {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sign-up</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleImageSelect}>
          <Text style={styles.buttonText}>Select Profile Image</Text>
        </TouchableOpacity>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />

        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        <TextInput
          style={styles.input}
          placeholder="Weight (in kg)"
          onChangeText={(text) => setWeight(text)}
          value={weight}
        />

        

        {profileImage && (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleback}>
          <Text style={styles.buttonText}>Go-Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#3498db',
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#fff',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 12,
  },
});

export default Signup;
