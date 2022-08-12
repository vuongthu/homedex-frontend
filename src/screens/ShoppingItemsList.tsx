import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import ShoppingItem from "../components/ShoppingItem";

const ShoppingItemsList = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerLabel}>Shopping List</Text>
                <Image source={require('../images/shopping-symbol.png')}/>
            </View>
            <ScrollView>
                <ShoppingItem></ShoppingItem>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 40,
        marginTop: 100,
        alignItems: "center"
    },
    headerLabel: {
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: '700',
        textAlign: 'center',
        marginRight: 15,
    }
});

export default ShoppingItemsList;