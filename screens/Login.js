import React, { useContext } from 'react'
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button, Input, Icon } from '@ui-kitten/components';
import { TouchableWithoutFeedback, StyleSheet, View } from 'react-native'
import { GlobalContext } from "../context/GlobalState";

const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
);

function Login({ navigation }) {
    const contextStore = useContext(GlobalContext);
    const [value, setValue] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    const renderCaption = () => {
        return (
            <View style={styles.captionContainer}>
                {AlertIcon(styles.captionIcon)}
                {/* <Text style={styles.captionText}>Should contain at least 8 symbols</Text> */}
            </View>
        )
    }
    return (
        <Layout style={{ flex: 1, alignItems: 'center' }}>
            <Layout style={{ width: "80%" }}>
                <Text category='h1' style={{ textAlign: 'center', marginBottom: 20, marginTop: 130 }}>Login Screen</Text>
                <Input
                    placeholder='User Id'
                    value={value}
                    label='User Id'
                    onChangeText={nextValue => setValue(nextValue)}
                    style={{ marginBottom: 20 }}
                />
                <Input
                    value={value2}
                    label='Password'
                    placeholder='Place your Text'
                    caption={renderCaption}
                    accessoryRight={renderIcon}
                    secureTextEntry={secureTextEntry}
                    onChangeText={nextValue => setValue2(nextValue)}
                    style={{ marginBottom: 20 }}
                />
                <Button onPress={() => {
                    contextStore.setLoginData({ isLogin: true })
                    // navigation.navigate('HomeScreen')
                }}>
                    Login
                </Button>
            </Layout>
        </Layout>
    )
}

export default Login

const styles = StyleSheet.create({
    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    captionIcon: {
        width: 10,
        height: 10,
        marginRight: 5
    },
    captionText: {
        fontSize: 12,
        fontWeight: "400",
        color: "#8F9BB3",
    }
});