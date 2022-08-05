import React from 'react';
import { Image, Text, ScrollView, StyleSheet, View } from "react-native";
import Household from "../components/Household";
import AddButton from "../components/AddButton";

const HouseholdList = () => {

    
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerLabel}>Households</Text>
                <AddButton></AddButton>
            </View>
            <ScrollView>
                <Household householdName="Household 1"></Household>
                <Household householdName="Household 2"></Household>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    headerLabel: {
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