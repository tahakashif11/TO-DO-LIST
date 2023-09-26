import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  
  StyleSheet,
  Alert,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authslice';
function LoginPage({ navigation }) {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch=useDispatch()

  function handlesignup(){
    navigation.navigate('Signup')
  }

  const handleLogin = () => {
    // Dispatch the login action here
    dispatch(login({ email, password }))
      .then((result) => {
        if (result.payload.authToken) {
          navigation.navigate('Home', { userId: result.payload.userId });
        } else {
          Alert.alert('Wrong credentials. Please try again.');
        }
      })
      .catch((error) => {
        Alert.alert('Wrong credentials. Please try again.');
      });
  }
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
              placeholder="email"
              placeholderTextColor="#ccc" // Customize placeholder color
              onChangeText={(text) => setemail(text)}
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
            >
              
                <Text style={styles.buttonText}>Click Me</Text>
              
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handlesignup}
            >
              
                <Text style={styles.buttonText}>Sign-up</Text>
              
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    padding: 20,
    borderRadius: 20, 
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
    marginBottom: 10,
  
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginPage;
