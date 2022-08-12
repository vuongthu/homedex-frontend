import { Image, Pressable, StyleSheet } from "react-native";
import React from "react";

type HeartButton = {
    onPressHandler: () => void;
    style?: {};
    liked: boolean;
}

const HeartButton = ({ onPressHandler, style, liked }: HeartButton) => {
    return (<Pressable style={({ pressed }) => pressed ? [styles.pressed, style] : [style]}
                       onPress={onPressHandler}>
        {liked ? <Image style={styles.img} source={require('../images/heart-symbol.png')}/>
            : <Image style={styles.img} source={require('../images/heart-symbol-inactive.png')}/>
        }
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

export default HeartButton;
