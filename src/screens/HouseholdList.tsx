import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Household from "../components/Household";
import AddButton from "../components/AddButton";
import createHousehold, { editHousehold, getHouseholds, Households } from "../../requests";
import * as SecureStore from 'expo-secure-store';

const HouseholdList = ({ route, navigation }) => {
    let userId: string;

    const [householdData, setHouseholdData] = useState([]);

    const retrieveUser = async () => {
        try {
            return await SecureStore.getItemAsync('user-id');
        } catch (err) {
            console.log(`user-id from secure store not found: ${err}`)
        }
    };

    useEffect(() => {

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
                onEditHandler={() => navigation.navigate('Household Form', {
                    userId: userId,
                    householdNameParam: household.name,
                    householdId: household.id
                })}
            ></Household>
        })

    useEffect(() => {

        retrieveUser().then((result: string) => {
            userId = result;
            if (route.params?.householdName) {
                if (route.params?.action === 'add') {
                    createHousehold(route.params.householdName, userId)
                        .then((household: Households) => {
                            setHouseholdData((oldData: [Households]) => {
                                return [...oldData, household]
                            })
                            navigation.navigate('Categories', {
                                householdId: household.id,
                                householdName: household.name
                            })
                        })
                } else if (route.params?.action === 'edit') {
                    editHousehold(route.params.householdName, route.params.householdId)
                        .then((household: Households) => {
                            setHouseholdData((oldData: Households[]) => {
                                return oldData.map((oldHousehold: Households) => {
                                    if (oldHousehold.id === household.id) {
                                        return household
                                    } else {
                                        return oldHousehold
                                    }
                                })
                            })
                        })
                }
            }
        });
    }, [route.params?.action]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerLabel}>Households</Text>
                <AddButton
                    onPressHandler={() => navigation.navigate('Household Form', { userId: userId })}></AddButton>
            </View>
            <ScrollView>
                {householdList}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 120,
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
        marginBottom: 50,
        marginTop: 60,
    },
})

export default HouseholdList;