import React from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";


type TextButtonProps = {
    onPressHandler?: () => void;
    style?: {};
    text: string;
};

const TextButton = ({ onPressHandler, style, text }: TextButtonProps) => {


    return (
        <Pressable style={({ pressed }) => pressed ? [styles.pressed] : []}
                   onPress={onPressHandler}>
            <Text style={[style]}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    }
})

export default TextButton;