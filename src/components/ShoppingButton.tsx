import { Image, Pressable, StyleSheet } from "react-native";
import React from "react";

type ShoppingButton = {
    onPressHandler: () => void;
    style?: {},
}

const ShoppingButton = ({ onPressHandler, style }: ShoppingButton) => {
    return (<Pressable style={({ pressed }) => pressed ? [styles.pressed, style] : [style]}
                       onPress={onPressHandler}>
        <Image style={styles.img} source={require('../images/shopping-icon.png')}/>
    </Pressable>)
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    img: {
        height: 30,
        width: 30,
    }
});

export default ShoppingButton;
