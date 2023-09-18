import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

function LoginPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      let response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });

      let authToken = response.data.token;
      let userid = response.data.id;

      if (authToken) {
        await AsyncStorage.setItem('authToken', authToken);
        await AsyncStorage.setItem('userid', userid.toString());
        console.log('Navigating to Home');

        navigation.navigate('Home', {
          userid,
        });
      } else {
        Alert.alert('Wrong credentials. Please try again.');
      }
    } catch (error) {
      Alert.alert('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const image = {
    uri:
      'https://img.freepik.com/free-vector/list-concept-illustration_114360-2498.jpg?w=2000',
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.backgroundImage}>
          <View style={styles.formContainer}>
            <Text style={styles.heading}>Welcome!</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#ccc" // Customize placeholder color
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#ccc" // Customize placeholder color
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Click Me</Text>
              )}
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Transparent black background
    padding: 20,
    borderRadius: 20, // Adjust border radius
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  heading: {
    fontSize: 24,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ffffff',
    borderWidth: 1,
    textShadowColor: '#ffffff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginPage;
