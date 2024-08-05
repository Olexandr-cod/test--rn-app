import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DASHBOARD_ROUTES} from '../routes';
import UsersStack from '../StackNavigator/UsersStack';
import SignupStack from '../StackNavigator/SignUpStack';
import TabNavButton from '../../components/navigator/TabNavButton';
import {colors} from '../../styles';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.silver,
        },
      }}>
      <Tab.Screen
        name={DASHBOARD_ROUTES.USERS_TAB_SCREEN}
        component={UsersStack}
        options={() => ({
          tabBarButton: props => (
            <TabNavButton
              {...props}
              activeImage={'peopleTab'}
              title={'Users'}
            />
          ),
        })}
      />
      <Tab.Screen
        name={DASHBOARD_ROUTES.SIGNUP_TAB_SCREEN}
        component={SignupStack}
        options={() => ({
          tabBarButton: props => (
            <TabNavButton
              {...props}
              activeImage={'signupTab'}
              title={'Sign up'}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
