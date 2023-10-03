import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../redux/signupslice'; 
import {launchImageLibrary} from 'react-native-image-picker'

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [weight, setWeight] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const dispatch = useDispatch();

  const handleImageSelect = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.error) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,16}$/;
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const weightRegex = /^[0-9]+$/;
  const usernameRegex=/^[a-zA-z0-9]+$/;

  const handleSubmit = async () => {
    
    const userData = {
      email,
      username,
      password,
      weight,
      profileImage,
    };

    try {
      await dispatch(signUpUser(userData));
      if (
        !emailRegex.test(email) ||
        !usernameRegex.test(username) ||
        !passwordRegex.test(password) ||
        !weightRegex.test(weight)
      ) {
        Alert.alert('Error', 'Please fill in all fields and correctly according to the format');
        return;
      }
  
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error creating user:', error);
      Alert.alert('Error', 'Error creating user. Please try again.');
    }
  };




  function handleback() {
    navigation.navigate('Login');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={styles.innerContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Sign-up</Text>
        </View>
        <TouchableOpacity style={styles.imageButton} onPress={handleImageSelect}>
          <Text style={styles.buttonText}>Select Profile Image</Text>
        </TouchableOpacity>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email should be legal"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />

          <TextInput
            style={styles.input}
            placeholder="Username should not contain number"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />

          <TextInput
            style={styles.input}
            placeholder="Password should contain 8 "
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />

          <TextInput
            style={styles.input}
            placeholder="Weight (in kg) should be digit"
            onChangeText={(text) => setWeight(text)}
            value={weight}
            keyboardType="numeric"
          />

          {profileImage && (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          )}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleback}>
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#3498db',
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
  },
  form: {
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#f2f2f2',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  imageButton: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginVertical: 20,
  },
});

export default Signup;
