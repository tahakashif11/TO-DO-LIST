import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, ActivityIndicator, ImageBackground, StyleSheet } from 'react-native';
import { fetchUserProfile } from '../redux/profileSlice';
import profilestyle from '../styles/stylescreenProfile'
const Profile = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.authToken);

  useEffect(() => {
    const fetchData = async () => {
      try {


        dispatch(fetchUserProfile(userId));

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [dispatch, userId]);
  const userData = useSelector((state) => state.profile.userData);
  const loading = useSelector((state) => state.profile.loading);
  console.log(userData)


  return (
    <View style={profilestyle.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : userData ? (




        <ImageBackground
          source={{
            uri: userData.uri,
          }}
          style={profilestyle.imageBackground}
        >
          <View style={profilestyle.overlay}>
            <Text style={profilestyle.nameText}>Name: {userData.username}</Text>
            <Text style={profilestyle.emailText}>Email: {userData.email}</Text>
            <Text style={profilestyle.weightText}>Weight: {userData.weight} kg</Text>
          </View>

        </ImageBackground>


      ) : (
        <Text style={profilestyle.noProfilePicText}>Profile picture doesn't exist.</Text>
      )}
    </View>
  );
};

export default Profile;
