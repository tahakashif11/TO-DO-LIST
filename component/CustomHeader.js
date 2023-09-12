import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

 // You may need to install this package

const CustomHeader = ({ title, navigation }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5 }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      <MaterialCommunityIcons name="logout" color='black' size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;