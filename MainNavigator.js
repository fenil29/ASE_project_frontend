import React,{useContext} from 'react'
import { StyleSheet } from 'react-native';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import FaceCamera from './screens/FaceCamera';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalContext } from "./context/GlobalState";
import { Ionicons } from '@expo/vector-icons';
import { Icon } from '@ui-kitten/components';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function HomeScreen() {
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let focusColor = focused ? '#3366ff' : 'gray';

          if (route.name === 'Dashboard') {
            iconName = focused ? 'calendar' : 'calendar-outline';

          } else if (route.name === 'FaceCamera') {
            iconName = focused ? 'camera' : 'camera-outline';
          }

          // You can return any component that you like here!
        //   return <Ionicons name={iconName} size={size} color={color} />;
        return <Icon       style={styles.icon}     name={iconName}  fill={focusColor}  />
    //     return <Icon
    //     style={styles.icon}
    //     fill='#8F9BB3'
    //     name='star'
    //   />
        },
        tabBarActiveTintColor: '#3366ff',
        tabBarInactiveTintColor: 'gray',
      })}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="FaceCamera" component={FaceCamera} />
      </Tab.Navigator>
    );
  }

  
function MainNavigator() {
    const contextStore = useContext(GlobalContext);
    return (
        <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{
            headerShown: false
        }}>
            {!contextStore.loginData.isLogin ? (
                <>
                    <Stack.Screen name="LoginScreen" component={Login} />
                </>
            ) : (
                <>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                </>
            )}
        </Stack.Navigator>
    )
}

export default MainNavigator

const styles = StyleSheet.create({
    icon: {
      width: 25,
      height: 25,
    },
  });
