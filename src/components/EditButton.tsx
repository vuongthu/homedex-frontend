import { Image, Pressable, StyleSheet } from "react-native";
import React from "react";

const EditButton = () => {
    return (<Pressable style={({ pressed }) => pressed ? styles.pressed : []} onPress={() => console.log("Editing!")}>
        <Image source={require('../images/more.png')}/>
    </Pressable>)
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    }
});

export default EditButton;
