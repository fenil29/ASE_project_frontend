import React,{useContext} from 'react'
import Login from './screens/Login';
import Home from './screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalContext } from "./context/GlobalState";
const Stack = createNativeStackNavigator();

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
                    <Stack.Screen name="HomeScreen" component={Home} />
                </>
            )}
        </Stack.Navigator>
    )
}

export default MainNavigator
