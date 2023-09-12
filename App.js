import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from './Screens/LoginPage';
import HomePage from './Screens/HomePage';
import CustomHeader from './component/CustomHeader'; // Import your custom header component

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Boarding">
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
              <CustomHeader
                title={options.title}
                navigation={navigation}
              />
            ),
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
