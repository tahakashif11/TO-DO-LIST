import { StyleSheet, Text, View, Image, ImageBackground, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react'; // Import useState
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../redux/profileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null); // Initialize userId as null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userIdString = await AsyncStorage.getItem('userid');
        const userId = parseInt(userIdString, 10); // Convert the string to a number
        setUserId(userId); // Set the userId in state

        // Dispatch the fetchUserProfile action
        dispatch(fetchUserProfile(userId));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, [dispatch]); // Dependencies array for useEffect

  const userData = useSelector((state) => state.profile.userData);
  console.log(userData)
  const loading = useSelector((state) => state.profile.loading);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : userData ? (
        <ImageBackground
          source={{
            uri: userData.image,
          }}
          style={styles.imageBackground}
        >
          <View style={styles.overlay}>
            <Text style={styles.nameText}>Name: {userData.firstName}</Text>
            <Text style={styles.emailText}>Email: {userData.email}</Text>
            <Text style={styles.weightText}>Weight: {userData.weight} kg</Text>
          </View>
        </ImageBackground>
      ) : (
        <Text>Loading user data...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'mintcream',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    borderRadius: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  emailText: {
    fontSize: 18,
    color: 'black',
  },
  weightText: {
    fontSize: 18,
    color: 'black',
  },
});

export default Profile;
