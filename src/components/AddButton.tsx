import { Image, Pressable, StyleSheet } from "react-native";
import React from "react";

type AddButtonProps = {
    onPressHandler?: () => void;
    style?: {};
};

const AddButton = ({ onPressHandler, style }: AddButtonProps) => {


    return (
        <Pressable style={({ pressed }) => pressed ? [styles.pressed, style] : [style]}
                   onPress={onPressHandler}>
            <Image source={require('../images/plus.png')}/>
        </Pressable>
    )
}

const styles = StyleSheet.create({

    pressed: {
        opacity: 0.75,
    }
})

export default AddButton;