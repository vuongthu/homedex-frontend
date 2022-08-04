import React from 'react';
import { Image, Text, ScrollView, StyleSheet, View } from "react-native";
import Households from "../components/Households";
import AddButton from "../components/AddButton";

const HouseholdList = () => {

    
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Households</Text>
                <AddButton></AddButton>
            </View>
            <ScrollView>
                <Households householdName="Household 1"></Households>
                <Households householdName="Household 2"></Households>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    header: {
        color: '#667080',
        fontSize: 24,
        fontWeight: '700',
        marginLeft: 23,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 67,
        marginTop: 60,
    }
})

export default HouseholdList;