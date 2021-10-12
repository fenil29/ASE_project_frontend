import React from 'react'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components';

function Login({ navigation }) {
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text category='h1'>Login Screen</Text>
            <Button onPress={() => navigation.navigate('HomeScreen')}>
                Login
            </Button>
        </Layout>
    )
}

export default Login
