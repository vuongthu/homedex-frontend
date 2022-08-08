import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./src/screens/Login";
import HouseholdList from "./src/screens/HouseholdList";
import AddHousehold from "./src/screens/AddHousehold";
import CategoriesList from "./src/screens/CategoriesList";
import ItemList from "./src/screens/ItemList";
import ItemForm from "./src/screens/ItemForm";
import AddCategory from "./src/screens/AddCategory";

const Stack = createNativeStackNavigator();

const App = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: '#8EA7BA' } }}>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Households"
                    component={HouseholdList}
                    // options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Create Household"
                    component={AddHousehold}
                />
                <Stack.Screen
                    name="Categories"
                    component={CategoriesList}
                />
                <Stack.Screen
                    name="Create Category"
                    component={AddCategory}
                />
                <Stack.Screen
                    name="Items"
                    component={ItemList}
                />
                <Stack.Screen
                    name="Item Form"
                    component={ItemForm}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({});

export default App;