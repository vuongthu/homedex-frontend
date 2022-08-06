import { Image, Pressable, StyleSheet } from "react-native";
import React from "react";

type AddButtonProps = {
    onPressHandler: () => void;
};

const AddButton = ({ onPressHandler }: AddButtonProps) => {


    return (
        <Pressable style={({ pressed }) => pressed ? [styles.container, styles.pressed] : styles.container}
                   onPress={() => onPressHandler ? onPressHandler() : console.log("Added!")}>
            <Image source={require('../images/plus.png')}/>
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
})

export default AddButton;