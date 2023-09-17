import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './Screens/HomePage';
import LoginPage from './Screens/LoginPage';
import CustomHeader from './component/CustomHeader';
import { Provider } from 'react-redux';
import store from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

async function checkAuthentication() {
  try {
    const authToken = await AsyncStorage.getItem('authToken');
    return authToken ? 'Home' : 'Login';
  } catch (error) {
    console.error('Error checking authentication:', error);
    return 'Login';
  }
}

const App = () => {
  const [initialRoute, setInitialRoute] = useState('Loading');

  useEffect(() => {
    const authenticateUser = async () => {
      const route = await checkAuthentication();
      setInitialRoute(route);
    };

    authenticateUser();
  }, []);

  if (initialRoute === 'Loading') {
    // You can render a loading screen here if needed
    return null;
  } else if (initialRoute === 'Login') {
    // Render the Login screen
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
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
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  } else if (initialRoute === 'Home') {
    // Render the Home screen
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
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
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }

  return null; // Default return null if initialRoute is not recognized
};

export default App;
