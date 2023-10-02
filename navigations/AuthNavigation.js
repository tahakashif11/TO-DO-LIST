import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginPage from '../Screens/LoginPage'
import HomePage from './HomePage'
import Signup from '../Screens/Signup'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomHeader from '../component/CustomHeader'

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={'Login'}>
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

export default AuthNavigation

const styles = StyleSheet.create({})