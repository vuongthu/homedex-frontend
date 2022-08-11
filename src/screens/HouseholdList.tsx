import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Household from "../components/Household";
import AddButton from "../components/AddButton";
import createHousehold, { getHouseholds, Households } from "../../requests";
import * as SecureStore from 'expo-secure-store';

const HouseholdList = ({ route, navigation }) => {
    let userId: string;

    const [householdData, setHouseholdData] = useState([]);

    useEffect(() => {
        const retrieveUser = async () => {
            try {
                return await SecureStore.getItemAsync('user-id');
            } catch (err) {
                console.log(`user-id from secure store not found: ${err}`)
            }
        };

        retrieveUser().then((result: string) => {
            userId = result;
            getHouseholds(userId).then((households: [Households]) => {
                setHouseholdData(households)
            })
        });
    }, [])

    const householdList =
        householdData.map((household: Households) => {
            return <Household
                key={household.id}
                householdName={household.name}
                onPressHandler={() => navigation.navigate('Categories', {
                    householdId: household.id,
                    householdName: household.name
                })}
            ></Household>
        })

    useEffect(() => {
        if (route.params?.householdName) {
            createHouseholdHandler(route.params.householdName)
                .then((household: Households) => {
                    setHouseholdData((oldData: [Households]) => {
                        return [...oldData, household]
                    })
                    navigation.navigate('Categories', {
                        householdId: household.id,
                        householdName: household.name
                    })
                })
        }
    }, [route.params?.householdName]);

    const createHouseholdHandler = async (householdName: string) => {
        return await createHousehold(householdName, userId);
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerLabel}>Households</Text>
                <AddButton
                    onPressHandler={() => navigation.navigate('Create Household', { userId: userId })}></AddButton>
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