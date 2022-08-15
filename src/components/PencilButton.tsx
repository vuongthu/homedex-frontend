import { Image, Pressable, StyleSheet } from "react-native";
import React from "react";

type PencilButton = {
    onPressHandler: () => void;
    style?: {},
}

const PencilButton = ({ onPressHandler, style }: PencilButton) => {
    return (<Pressable style={({ pressed }) => pressed ? [styles.pressed, style] : [style]}
                       onPress={onPressHandler}>
        <Image source={require('../images/pencil.png')}/>
    </Pressable>)
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    }
});

export default PencilButton;