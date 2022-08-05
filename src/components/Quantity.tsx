import React from 'react';
import { Pressable, StyleSheet, Image, View, Text } from "react-native";

const Quantity = ({ amount, onIncrease, onDecrease }) => {
    return(
        <View style={styles.container}>
            <Pressable style={({pressed}) => pressed ? [styles.container, styles.pressed] : styles.container} onPress={onDecrease}>
                <Image source={require('../images/minus-circle.png')} />
            </Pressable>
            <Text>{amount}</Text>
            <Pressable style={({pressed}) => pressed ? [styles.container, styles.pressed] : styles.container} onPress={onIncrease}>
                <Image source={require('../images/plus-circle.png')} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    pressed: {
        opacity: 0.75,
    }
})

export default Quantity;