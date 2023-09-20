import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './Screens/HomePage';
import LoginPage from './Screens/LoginPage';
import CustomHeader from './component/CustomHeader';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const App = () => {
  const authToken = useSelector((state) => state.auth.authToken);

  const [initialRoute, setInitialRoute] = useState('Loading');

  useEffect(() => {
    const authenticateUser = () => {
      const route = authToken ? 'Home' : 'Login';
      setInitialRoute(route);
    };

    authenticateUser();
  }, [authToken]);

  if (initialRoute === 'Loading') {
    return null; // You can render a loading screen here if needed
  } else if (initialRoute === 'Login'){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
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
    );
  } else if (initialRoute === 'Home'){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
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
    );
  }
};

export default App;
