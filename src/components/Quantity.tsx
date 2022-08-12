import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Quantity = ({ amount, onIncrease, onDecrease }) => {
    return (
        <View style={styles.container}>
            <Pressable style={({ pressed }) => pressed ? [styles.container, styles.pressed] : styles.container}
                       onPress={onDecrease}>
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
    }
})

export default Quantity;