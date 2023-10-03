import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, ActivityIndicator, ImageBackground,StyleSheet } from 'react-native';
import { fetchUserProfile } from '../redux/profileSlice';

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
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : userData ? (
        

        
       
        <ImageBackground
          source={{
            uri: userData.uri,
          }}
          style={styles.imageBackground}
        >
          <View style={styles.overlay}>
            <Text style={styles.nameText}>Name: {userData.username}</Text>
            <Text style={styles.emailText}>Email: {userData.email}</Text>
            <Text style={styles.weightText}>Weight: {userData.weight} kg</Text>
          </View>
        
        </ImageBackground>
        
        
      ) : (
        <Text style={styles.noProfilePicText}>Profile picture doesn't exist.</Text>
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
