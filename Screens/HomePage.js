import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { StyleSheet, Button, View } from 'react-native'
import React from 'react'

import Profile from './Profile';
import MyHome from './MyHome';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


const Tab = createMaterialBottomTabNavigator();
const HomePage = ({ route }) => {
  
  console.log(route.params)
  return (
    <View style={styles.container}>

    <Tab.Navigator

      activeColor="#e91e63"
      barStyle={{ backgroundColor: 'coral' }} >

      <Tab.Screen
        name="Homies"
        component={MyHome}
        initialParams={route.params}
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
        initialParams={route.params}
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
    flex: 1, // Make the container take up the entire screen
    backgroundColor: 'tomato', // Set the background color to tomato
  },
})