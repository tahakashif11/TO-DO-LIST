import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const CustomHeader = ({ title, navigation }) => {
  

  const handleLogout = () => {
    dispatch(resetState());
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