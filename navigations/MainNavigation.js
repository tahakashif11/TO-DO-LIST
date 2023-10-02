import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthNavigation'

const MainNavigation = () => {
  const authToken = useSelector((state) => state.auth.authToken);

  const [initialRoute, setInitialRoute] = useState('Loading');

  useEffect(() => {
    const authenticateUser = () => {
      console.log(authToken)
      const route = authToken ? 'Home' : 'Login';

      setInitialRoute(route);
    };

    authenticateUser();
  }, [authToken]);

  if (initialRoute === 'Loading') {
    return null; 
  }

  return initialRoute === 'Login' ? <AuthNavigation /> : <AppNavigation />;
};

export default MainNavigation;
