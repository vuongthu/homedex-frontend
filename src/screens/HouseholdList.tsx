import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Household from "../components/Household";
import AddButton from "../components/AddButton";

const HouseholdList = ({ route, navigation }) => {
    const { userId } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerLabel}>Households</Text>
                <AddButton onPressHandler={() => navigation.navigate('Create Household')}></AddButton>
            </View>
            <ScrollView>
                <Pressable style={({pressed}) => pressed ? styles.pressed : []} onPress={() => navigation.navigate('Categories')}>
                    <Household householdName="Household 1"></Household>
                    <Household householdName="Household 2"></Household>
                </Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    headerLabel: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '700',
        marginLeft: 23,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 67,
        marginTop: 60,
    },
    pressed: {
        opacity: 0.75,
    }
})

export default HouseholdList;