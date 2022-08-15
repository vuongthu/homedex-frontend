import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import React, { useEffect, useState } from "react";
import AcceptButton from "../components/AcceptButton";
import CancelButton from "../components/CancelButton";
import TextButton from "../components/TextButton";
import ImagePicker from "../components/ImagePicker";

const HouseholdForm = ({ route, navigation }) => {

    const { userId, householdNameParam, householdImageParam, householdId } = route.params;
    const [householdName, setHouseholdName] = useState<string>("");
    const [isInputValid, setInputValid] = useState<boolean>(false);
    const [householdImage, setHouseholdImage] = useState<string>("");

    const handleHouseholdTextChange = (text: string) => {
        setHouseholdName(text);
    };

    useEffect(() => {
        if (householdNameParam) {
            setHouseholdName(householdNameParam)
        }

        if (householdImageParam) {
            setHouseholdImage(householdImageParam)
        }
    }, [])

    useEffect(() => setInputValid(householdName.length > 0 && householdName.length <= 13), [householdName])

    const onSaveHousehold = () => {
        if (householdNameParam) {
            navigation.navigate({
                name: 'Households',
                params: {
                    householdId: householdId,
                    householdName: householdName,
                    householdImage: householdImage,
                    action: 'edit'
                },
                merge: true,
            })
        } else {
            navigation.navigate({
                name: 'Households',
                params: { householdName: householdName, householdImage: householdImage, action: 'add' },
                merge: true,
            })
        }
    }

    const onDeleteHousehold = () => {
        navigation.navigate({
            name: 'Households',
            params: { householdId: householdId, householdName: householdName, action: 'delete' },
            merge: true,
        })
    }

    const onSelectPhoto = (data: string) => {
        setHouseholdImage(`data:image/jpeg;base64,${data}`)
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <Pressable onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.photoContainer}>
                        <Image style={styles.img} source={require('../images/logo.png')}/>
                        <Text
                            style={styles.header}>{householdNameParam ? 'Edit Household' : 'Create New Household'}</Text>
                        {householdImage ? <Image style={styles.householdImage} source={{ uri: householdImage }}/>
                            : <Image style={styles.householdImage} source={require('../images/imgplaceholder.png')}/>}
                        <ImagePicker style={styles.photoLabel} onPressHandler={onSelectPhoto}></ImagePicker>
                    </View>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Household Name</Text>
                        <TextInput
                            style={styles.input}
                            value={householdName}
                            onChangeText={handleHouseholdTextChange}
                            placeholder=""
                        />
                        <View style={styles.buttonContainer}>
                            <CancelButton
                                style={styles.button}
                                title="Cancel"
                                onPressHandler={() => navigation.navigate('Households', { userId: userId })}
                            ></CancelButton>
                            <AcceptButton
                                style={styles.button}
                                title="Save"
                                onPressHandler={onSaveHousehold}
                                disabled={!isInputValid}
                            ></AcceptButton>
                        </View>
                        {householdNameParam ?
                            <TextButton
                                onPressHandler={onDeleteHousehold}
                                text={'Delete?'}
                                style={styles.textButton}
                            ></TextButton>
                            : <></>}
                    </View>
                </View>
            </Pressable>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end'
    },
    photoContainer: {
        alignItems: 'center',
    },
    img: {
        width: 125,
        height: 93,
        marginTop: 130,
    },
    header: {
        fontWeight: '700',
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 33,
        marginTop: 50,
    },
    householdImage: {
        width: 77,
        height: 77,
        borderRadius: 50,
    },
    photoLabel: {
        marginTop: 10,
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '400',
    },
    formContainer: {
        marginTop: 50,
        alignSelf: 'center',
    },
    label: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '400',
    },
    input: {
        height: 48,
        width: 313,
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        marginTop: 10,
        borderColor: '#FFFFFF',
        color: '#FFFFFF',
    },
    buttonContainer: {
        width: 313,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        width: 147,
        height: 56,
    },
    textButton: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 30,
        color: '#667080',
    },
});

export default HouseholdForm;