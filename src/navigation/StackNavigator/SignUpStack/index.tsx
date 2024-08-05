import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DASHBOARD_ROUTES} from '../../routes';
import SignUpScreen from '../../../screens/SignUpScreen';
import CustomHeader from '../../../components/navigator/CustomHeader';

const Stack = createStackNavigator();

const SignupStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={DASHBOARD_ROUTES.SIGNUP_SCREEN}
        component={SignUpScreen}
        options={{
          header: () => <CustomHeader title="Working with POST request" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default SignupStack;
