import React from 'react';
import { Image, Pressable, Text, StyleSheet, View } from "react-native";

const Category = ({ categoriesName }) => {
    return(
        <Pressable style={({pressed}) => pressed ? [styles.text, styles.pressed] : styles.text} onPress={() => console.log("Pressed!")}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{categoriesName}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        backgroundColor: '#DCE3E9',
        width: 160,
        height: 96,
        marginBottom: 16,
        borderRadius: 6,
    },
    text: {
        color: '#667080',
        lineHeight: 145,
        paddingLeft: 10,
    },
    pressed: {
        opacity: 0.75,
    }
})

export default Category;