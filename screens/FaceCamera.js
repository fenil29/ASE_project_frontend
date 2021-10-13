import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Icon } from '@ui-kitten/components';


export default function FaceCamera() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View >
            <Camera type={type} style={{ height: "100%" }}>
                <View style={{ height: "100%" }}>
                    <TouchableOpacity
                    style={{ position:"absolute",bottom: 20,right:20 }}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <View
                            style={{ borderColor: "white", borderStyle: "solid", borderWidth: "1px",padding:10 ,borderRadius:5 }}
                        >
                            <Icon
                                style={styles.icon}
                                fill='white'
                                name='flip-2-outline'
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}
const styles = StyleSheet.create({
    icon: {
        width: 27,
        height: 27,
    },
});