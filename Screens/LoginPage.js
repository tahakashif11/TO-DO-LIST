
import 'react-native-gesture-handler';

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground,TouchableOpacity} from 'react-native';
import axios from 'axios';


function LoginPage({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      let response = await axios.post('https://dummyjson.com/auth/login', {
        username,
        password,
      });
      
      let authToken = response.data.token;
      let userid = response.data.id;
  
      if (authToken) {
        navigation.navigate('Home', {
          userid,
        });
      } else {
        Alert.alert('Wrong credentials. Please try again.');
      }
    } catch (error) {
      
      Alert.alert('An error occurred during login. Please try again.');
    }
  };
  const image = {
    uri:
      'https://img.freepik.com/free-vector/list-concept-illustration_114360-2498.jpg?w=2000',
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.backgroundImage}>
        <View style={styles.formContainer}>
          <Text style={styles.heading}>Welcome!</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={styles.button}onPress={handleLogin}  >
        <Text style={styles.buttonText}>Click Me</Text>
      </TouchableOpacity>

          
        </View>
      </ImageBackground>
    </View>
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
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 50,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'flex-start',
    marginTop: 30, // Adjust this value to move the form down
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
    textShadowColor:'#ffffff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#3498db', // Change to your desired button color
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    elevation: 3,
   
  },
  buttonText: {
    color: '#ffffff', // Text color
    fontSize: 16,
    fontWeight: 'bold',
    
    textAlign: 'center'
     // You can adjust the font weight as needed
  },
});

export default LoginPage;
