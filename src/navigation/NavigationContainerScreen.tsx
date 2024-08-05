import React, {useEffect} from 'react';
import Config from 'react-native-config';
import axios from 'axios';
import SplashScreen from 'react-native-splash-screen';
// import {useNetInfo} from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {isReadyNavigation, navigationRef} from './NavigationService';
import BottomTabs from './BottomTab';
import {createStackNavigator} from '@react-navigation/stack';
import StatusScreen from '../screens/StatusScreen';
import {DASHBOARD_ROUTES} from './routes';

axios.defaults.baseURL = Config.APP_API_URL;

const Stack = createStackNavigator();
const NavigationContainerScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyNavigation.current = true;
      }}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Tabs'} component={BottomTabs} />
        <Stack.Screen
          name={DASHBOARD_ROUTES.STATUS_SCREEN}
          component={StatusScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationContainerScreen;
