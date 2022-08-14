import React, { createContext, useEffect, useMemo, useReducer } from 'react';
import { Alert, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HouseholdList from "./src/screens/HouseholdList";
import HouseholdForm from "./src/screens/HouseholdForm";
import CategoriesList from "./src/screens/CategoriesList";
import ItemList from "./src/screens/ItemList";
import ItemForm from "./src/screens/ItemForm";
import CategoryForm from "./src/screens/CategoryForm";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';
import { User, userLogin } from "./requests";
import Login from "./src/screens/Login";
import NewUser from "./src/screens/NewUser";
import FavItemsList from "./src/screens/FavItemsList";
import ShoppingItemsList from "./src/screens/ShoppingItemsList";
import UserInfo from "./src/screens/UserInfo";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export const AuthContext = createContext();


const HomeFlow = () => {
    return (
        <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: '#8EA7BA' } }}>
            <Stack.Screen
                name={"Households"}
                component={HouseholdList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"Household Form"}
                component={HouseholdForm}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"Categories"}
                component={CategoriesList}
                options={{
                    title: "",
                    headerStyle: { backgroundColor: '#8EA7BA' }
                }}
            />
            <Stack.Screen
                name={"Category Form"}
                component={CategoryForm}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={"Items"}
                component={ItemList}
                options={{
                    title: "",
                    headerStyle: { backgroundColor: '#8EA7BA' }
                }}
            />
            <Stack.Screen
                name={"Item Form"}
                component={ItemForm}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

const FavoritesFlow = () => {
    return (
        <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: '#8EA7BA' } }}>
            <Stack.Screen
                name={"Favorites List"}
                component={FavItemsList}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

const ShoppingFlow = () => {
    return (
        <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: '#8EA7BA' } }}>
            <Stack.Screen
                name={"Shopping List"}
                component={ShoppingItemsList}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

const UserFlow = () => {
    return (
        <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: '#8EA7BA' } }}>
            <Stack.Screen
                name={"User Info"}
                component={UserInfo}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

const App = ({ navigation }) => {
    const [loginState, dispatchLoginState] = useReducer((prevState, action) => {
        switch (action.type) {
            case 'RESTORE_TOKEN':
                return {
                    userId: action.token,
                };
            case 'SIGN_IN':
                return {
                    userId: action.token,
                };
            case 'SIGN_OUT':
                return {
                    userId: null,
                };
        }
    }, { userId: null });

    useEffect(() => {
        SecureStore.getItemAsync('user-id')
            .then((value: string) => {
                dispatchLoginState({ type: 'RESTORE_TOKEN', token: value });
            })
            .catch((err) => console.log(`user-id from secure store not found: ${err}`));
    }, []);

    const authContext = useMemo(() => {
        return {
            signIn: async (username: string, password: string) => {
                const user: User = await userLogin(username, password)
                if (!user) {
                    Alert.alert('Login Failed', 'Please enter a valid username/email and/or password.')
                } else {
                    dispatchLoginState({ type: 'SIGN_IN', token: user.id });
                    await SecureStore.setItemAsync('user-id', user.id);
                }
            },
            signOut: async () => dispatchLoginState({ type: 'SIGN_OUT' })
        }
    }, []);

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {loginState?.userId ?
                    <Tab.Navigator>
                        <Tab.Screen
                            name="Home"
                            component={HomeFlow}
                            options={{
                                tabBarShowLabel: false,
                                tabBarActiveTintColor: '#587F9D',
                                tabBarIcon: ({ focused, color, size }) => (
                                    focused ? <Image source={require('./src/images/home-icon-active.png')}/> :
                                        <Image source={require('./src/images/home-icon-inactive.png')}/>

                                ),
                                headerShown: false,
                            }}
                        />
                        <Tab.Screen
                            name="Favorites"
                            component={FavoritesFlow}
                            options={{
                                tabBarShowLabel: false,
                                tabBarActiveTintColor: '#587F9D',
                                tabBarIcon: ({ focused, color, size }) => (
                                    focused ? <Image source={require('./src/images/heart-icon-active.png')}/> :
                                        <Image source={require('./src/images/heart-icon-inactive.png')}/>
                                ),
                                headerShown: false,
                            }}
                        />
                        <Tab.Screen
                            name="Shopping"
                            component={ShoppingFlow}
                            options={{
                                tabBarShowLabel: false,
                                tabBarActiveTintColor: '#587F9D',
                                tabBarIcon: ({ focused, color, size }) => (
                                    focused ? <Image source={require('./src/images/shopping-icon-active.png')}/> :
                                        <Image source={require('./src/images/shopping-icon-inactive.png')}/>
                                ),
                                headerShown: false,
                            }}
                        />
                        <Tab.Screen
                            name="User"
                            component={UserFlow}
                            options={{
                                tabBarShowLabel: false,
                                tabBarActiveTintColor: '#587F9D',
                                tabBarIcon: ({ focused, color, size }) => (
                                    focused ? <Image source={require('./src/images/user-icon-active.png')}/> :
                                        <Image source={require('./src/images/user-icon-inactive.png')}/>
                                ),
                                headerShown: false,
                            }}
                        />
                    </Tab.Navigator>
                    : <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: '#8EA7BA' } }}>
                        <Stack.Screen
                            name={"Login"}
                            component={Login}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name={"New User"}
                            component={NewUser}
                            options={{ title: "" }}
                        />
                    </Stack.Navigator>
                }
            </NavigationContainer>
        </AuthContext.Provider>
    );
}

const styles = StyleSheet.create({});

export default App;