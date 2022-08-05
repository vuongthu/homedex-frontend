import { StyleSheet, Pressable, Image } from "react-native";
import React from "react";

const AddButton = () => {
    return (
        <Pressable style={({pressed}) => pressed ? [styles.container, styles.pressed] : styles.container} onPress={() => console.log("Added!")}>
            <Image source={require('../images/plus.png')} />
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        marginRight: 23,
    },
    pressed: {
        opacity: 0.75,
    }
});

export default AddButton;