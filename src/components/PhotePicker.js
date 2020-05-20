import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, StyleSheet, Image, Button } from 'react-native';


export const PhotePicker = ({ onPick }) => {
    const [image, setimage] = useState(null)

    let takePhoto = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
    
        let pickerResult = await ImagePicker.launchCameraAsync();
        setimage(pickerResult.uri)
        onPick(pickerResult.uri)

    }

    
    return (
        <View>
            <Button title='Լուսանկարել' onPress={takePhoto} />
            {image && <Image style={styles.image} source={{uri: image}}/>}
            
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10

    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10

    }
})


