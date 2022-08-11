import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import FavItem from "../components/FavItem";

const FavItemsList = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerLabel}>Favorite Items</Text>
                <Image source={require('../images/heart-symbol.png')}/>
            </View>
            <ScrollView>
                <FavItem></FavItem>
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
        marginTop: 60,
        alignItems: "center"
    },
    headerLabel: {
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: '700',
        marginLeft: 16,
        marginRight: 15,
    }
});

export default FavItemsList;