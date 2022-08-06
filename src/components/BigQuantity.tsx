import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Quantity = ({ amount, onIncrease, onDecrease }) => {
    return (
        <View style={styles.container}>
            <Pressable style={({ pressed }) => pressed ? [styles.container, styles.pressed] : styles.container}
                       onPress={onDecrease}>
                <Image source={require('../images/minus-circle-big.png')}/>
            </Pressable>
            <Text style={styles.amount}>{amount}</Text>
            <Pressable style={({ pressed }) => pressed ? [styles.container, styles.pressed] : styles.container}
                       onPress={onIncrease}>
                <Image source={require('../images/plus-circle-big.png')}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    amount: {
        fontSize: 48,
        fontWeight: '400',
        color: '#FFFFFF',
    },
    pressed: {
        opacity: 0.75,
    }
})

export default Quantity;