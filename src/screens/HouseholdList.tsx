import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Household from "../components/Household";
import AddButton from "../components/AddButton";
import { getHouseholds, Households } from "../../requests";

const HouseholdList = ({ route, navigation }) => {
    const { userId } = route.params;

    const [householdData, setHouseholdData] = useState([]);

    useEffect(() => {
        getHouseholds(userId).then((households: [Households]) => {
            setHouseholdData(households)
        })
    }, [])

    const householdList =
        householdData.map((household: Households) => {
            return <Household
                key={household.id}
                householdName={household.name}
                onPressHandler={() => navigation.navigate('Categories', { householdId: household.id })}
            ></Household>
        })

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerLabel}>Households</Text>
                <AddButton onPressHandler={() => navigation.navigate('Create Household', {userId: userId })}></AddButton>
            </View>
            <ScrollView>
                <View>
                    {householdList}
                </View>
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
})

export default HouseholdList;