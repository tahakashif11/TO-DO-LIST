import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../redux/signupslice'; 
import {launchImageLibrary} from 'react-native-image-picker'
import signupstyle from '../styles/stylescreensignup'
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
    <ScrollView contentContainerStyle={signupstyle.container}>
      <KeyboardAvoidingView behavior="padding" style={signupstyle.innerContainer}>
        <View style={signupstyle.header}>
          <Text style={signupstyle.title}>Sign-up</Text>
        </View>
        <TouchableOpacity style={signupstyle.imageButton} onPress={handleImageSelect}>
          <Text style={signupstyle.buttonText}>Select Profile Image</Text>
        </TouchableOpacity>
        <View style={signupstyle.form}>
          <TextInput
            style={signupstyle.input}
            placeholder="Email should be legal"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />

          <TextInput
            style={signupstyle.input}
            placeholder="Username should not contain number"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />

          <TextInput
            style={signupstyle.input}
            placeholder="Password should contain 8 "
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />

          <TextInput
            style={signupstyle.input}
            placeholder="Weight (in kg) should be digit"
            onChangeText={(text) => setWeight(text)}
            value={weight}
            keyboardType="numeric"
          />

          {profileImage && (
            <Image source={{ uri: profileImage }} style={signupstyle.profileImage} />
          )}

          <TouchableOpacity style={signupstyle.button} onPress={handleSubmit}>
            <Text style={signupstyle.buttonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={signupstyle.button} onPress={handleback}>
            <Text style={signupstyle.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};



export default Signup;
