import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { StyleSheet, View } from 'react-native'
import React from 'react'

import Profile from '../Screens/Profile';
import MyHome from '../Screens/MyHome';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


const Tab = createMaterialBottomTabNavigator();
const HomePage = () => {
  
  
  return (
    <View style={styles.container}>

    <Tab.Navigator

      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'coral' }} >

      <Tab.Screen
        name="Homies"
        component={MyHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),

          
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="face-man-profile" color={color} size={26} />
          )
          
        }}
      />
    </Tab.Navigator>
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'tomato', 
  },
})