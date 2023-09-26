import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { resetState } from '../redux/taskSlice';
import { useDispatch } from 'react-redux';
import { resetAuthState } from '../redux/authslice';

const CustomHeader = ({ title, navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    // Clear AsyncStorage data
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }

    // Dispatch the resetState action
    
    dispatch(resetState());
    dispatch(resetAuthState())

    // Navigate to the Login screen
    navigation.navigate('Login');
  };
  
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5 }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{title}</Text>
      <TouchableOpacity onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" color='black' size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
