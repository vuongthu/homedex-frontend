import React from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AddButton from "../components/AddButton";
import Item from "../components/Item";

const InventoryList = ({navigation}) => {


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerLabel}>Kitchen Inventory</Text>
                <AddButton></AddButton>
            </View>
            <ScrollView>
                <Item name="Nectarines" brand="LV" expiration="8/4/2022"></Item>
                <Item name="Soy Sauce" brand="LV" expiration="8/4/2022"></Item>
                <Item name="Salt" brand="LV" expiration="8/4/2022"></Item>
                <Item name="Pepper" brand="LV" expiration="8/4/2022"></Item>
                <Item name="MSG" brand="LV" expiration="8/4/2022"></Item>
                <Item name="Himalayan Sea Salt" brand="LV" expiration="8/4/2022"></Item>
                <Item name="Limes" brand="LV" expiration="8/4/2022"></Item>
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
        justifyContent: "space-between",
        marginBottom: 40,
        marginTop: 60,
    },
    headerLabel: {
        color: '#667080',
        fontSize: 24,
        fontWeight: '700',
        marginLeft: 16,
    }
});

export default InventoryList;