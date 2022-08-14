import React from 'react';
import { Image, Pressable, PressableStateCallbackType, StyleSheet, Text, View } from "react-native";

type QuantityButtonProps = {
    amount: number;
    onIncrease: () => void;
    onDecrease: () => void;
};

const Quantity = ({ amount, onIncrease, onDecrease }: QuantityButtonProps) => {

    const decreaseButtonStyle = ({ pressed }: PressableStateCallbackType) => {
        if (pressed) {
            return [styles.container, styles.pressed]
        } else if (amount <= 0) {
            return [styles.container, styles.disabled]
        } else {
            return [styles.container]
        }
    };

    return (
        <View style={styles.container}>
            <Pressable style={decreaseButtonStyle}
                       onPress={onDecrease}
                       disabled={amount <= 0}>
                <Image source={require('../images/minus-circle.png')}/>
            </Pressable>
            <Text style={styles.amount}>{amount}</Text>
            <Pressable style={({ pressed }) => pressed ? [styles.container, styles.pressed] : styles.container}
                       onPress={onIncrease}>
                <Image source={require('../images/plus-circle.png')}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 115,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    amount: {
        color: '#FFFFFF',
    },
    pressed: {
        opacity: 0.75,
    },
    disabled: {
        opacity: 0.25,
    },
})

export default Quantity;