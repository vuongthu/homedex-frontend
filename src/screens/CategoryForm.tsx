import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import AcceptButton from "../components/AcceptButton";
import CancelButton from "../components/CancelButton";
import TextButton from "../components/TextButton";

const CategoryForm = ({ route, navigation }) => {

    const { householdId, householdName, categoryNameParam, categoryId } = route.params;
    const [categoryName, setCategoryName] = useState("");
    const [isInputValid, setInputValid] = useState(false);

    const handleCategoryTextChange = (text: string) => {
        setCategoryName(text);
    };

    useEffect(() => setInputValid(categoryName.length > 0), [categoryName])

    useEffect(() => {
        if (categoryNameParam) {
            setCategoryName(categoryNameParam)
        }
    }, [])

    const onSaveHandler = () => {
        if (categoryNameParam) {
            navigation.navigate({
                name: 'Categories',
                params: {
                    householdId: householdId,
                    householdName: householdName,
                    categoryName: categoryName,
                    categoryId: categoryId,
                    action: 'edit',
                },
                merge: true,
            })
        } else {
            navigation.navigate({
                name: 'Categories',
                params: {
                    householdId: householdId,
                    householdName: householdName,
                    categoryName: categoryName,
                    action: 'add',
                },
                merge: true,
            })
        }
    }

    const onDeleteCategory = () => {
        navigation.navigate({
            name: 'Categories',
            params: {
                householdId: householdId,
                householdName: householdName,
                categoryId: categoryId,
                action: 'delete',
            },
            merge: true,
        })
    }

    return (
        <View>
            <View style={styles.photoContainer}>
                <Image style={styles.img} source={require('../images/logo.png')}/>
                <Text style={styles.header}>{categoryNameParam ? 'Edit Category' : 'Create New Category'}</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Category Name</Text>
                <TextInput style={styles.input} value={categoryName} onChangeText={handleCategoryTextChange}
                           placeholder=""/>
                <View style={styles.buttonContainer}>
                    <CancelButton
                        style={styles.button}
                        title="Cancel"
                        onPressHandler={() => navigation.navigate('Categories', {
                            householdId: householdId,
                            householdName: householdName
                        })}
                    ></CancelButton>
                    <AcceptButton
                        style={styles.button}
                        title="Save"
                        onPressHandler={onSaveHandler}
                        disabled={!isInputValid}
                    ></AcceptButton>
                </View>
                {categoryNameParam ?
                    <TextButton
                        onPressHandler={onDeleteCategory}
                        text={'Delete?'}
                        style={styles.textButton}
                    ></TextButton>
                    : <></>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    photoContainer: {
        alignItems: 'center',
    },
    img: {
        width: 125,
        height: 93,
        marginTop: 180,
    },
    header: {
        fontWeight: '700',
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 33,
        marginTop: 50,
    },
    label: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '400',
    },
    formContainer: {
        alignSelf: 'center',
        marginTop: 20,
    },
    input: {
        height: 48,
        width: 313,
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        marginTop: 10,
        borderColor: '#FFFFFF',
        color: '#FFFFFF'
    },
    button: {
        width: 147,
        height: 56,
    },
    buttonContainer: {
        width: 313,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    textButton: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 30,
        color: '#667080',
    },
});

export default CategoryForm;