import { Image, Pressable, StyleSheet } from "react-native";
import React from "react";

type EllipseButton = {
    onPressHandler: () => void;
    style?: {},
}

const EllipseButton = ({ onPressHandler, style }: EllipseButton) => {
    return (<Pressable style={({ pressed }) => pressed ? [styles.pressed, style] : [style]}
                       onPress={onPressHandler}>
        <Image source={require('../images/more.png')}/>
    </Pressable>)
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    }
});

export default EllipseButton;
