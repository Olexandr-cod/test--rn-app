import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UsersScreen from '../../../screens/UsersScreen';
import {DASHBOARD_ROUTES} from '../../routes';
import CustomHeader from '../../../components/navigator/CustomHeader';

const Stack = createStackNavigator();

const UsersStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={DASHBOARD_ROUTES.USERS_SCREEN}
        component={UsersScreen}
        options={{
          header: () => <CustomHeader title="Working with GET request" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default UsersStack;
