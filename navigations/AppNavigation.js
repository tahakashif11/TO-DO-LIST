import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginPage from '../Screens/LoginPage'
import HomePage from './HomePage'
import Signup from '../Screens/Signup'
import CustomHeader from '../component/CustomHeader'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={'Home'}>
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{
              title: 'TODO APP',
              header: ({ navigation, options }) => (
                <CustomHeader title={options.title} navigation={navigation} />
              ),
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        </Stack.Navigator>
      </NavigationContainer>
    
  )
}

export default AppNavigation

