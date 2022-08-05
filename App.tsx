import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./src/screens/Login";
import HouseholdList from "./src/screens/HouseholdList";
import CreateHousehold from "./src/screens/CreateHousehold";
import CategoriesList from "./src/screens/CategoriesList";
import InventoryList from "./src/screens/InventoryList";
import AddItem from "./src/screens/AddItem";

const Stack = createNativeStackNavigator();

const App = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{contentStyle: {backgroundColor: '#8EA7BA'}}}>
                <Stack.Screen
                    name="Login"
                    component={Login}
                />
                <Stack.Screen
                    name="Household"
                    component={HouseholdList}
                />
                {/*<Stack.Screen*/}
                {/*    name="Household"*/}
                {/*    component={CreateHousehold}*/}
                {/*/>*/}
                {/*<Stack.Screen*/}
                {/*    name="Categories"*/}
                {/*    component={CategoriesList}*/}
                {/*/>*/}
                {/*<Stack.Screen*/}
                {/*    name="Items"*/}
                {/*    component={InventoryList}*/}
                {/*/>*/}
                {/*<Stack.Screen*/}
                {/*    name="Add New Item"*/}
                {/*    component={AddItem}*/}
                {/*/>*/}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
});

export default App;