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
import loginStyles from '../styles/stylescreenLoginPage';
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
      <View style={loginStyles.container}>
        <ImageBackground source={image} style={loginStyles.backgroundImage}>
          <View style={loginStyles.formContainer}>
            <Text style={loginStyles.heading}>Welcome!</Text>
            <TextInput
              style={loginStyles.input}
              placeholder="email"
              placeholderTextColor="#ccc" // Customize placeholder color
              onChangeText={(text) => setemail(text)}
            />
            <TextInput
              style={loginStyles.input}
              placeholder="Password"
              placeholderTextColor="#ccc" // Customize placeholder color
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={loginStyles.button}
              onPress={handleLogin}
            >
              
                <Text style={loginStyles.buttonText}>Click Me</Text>
              
            </TouchableOpacity>
            <TouchableOpacity
              style={loginStyles.button}
              onPress={handlesignup}
            >
              
                <Text style={loginStyles.buttonText}>Sign-up</Text>
              
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}
export default LoginPage;
