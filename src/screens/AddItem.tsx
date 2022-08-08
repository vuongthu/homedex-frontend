import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";
import AcceptButton from "../components/AcceptButton";
import MeasurementToggle from "../components/MeasurementToggle";
import DateTimePicker from '@react-native-community/datetimepicker';
import AddButton from "../components/AddButton";
import { ItemRequest, Items } from "../../requests";

const AddItem = ({ route, navigation }) => {

    const { categoryId, categoryName } = route.params;
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemBrand, setItemBrand] = useState("");
    const [addInfo, setAddInfo] = useState("");
    const [measureType, setMeasureType] = useState("Quantity");
    const [unit, setUnit] = useState(0);
    const [expiration, setExpiration] = useState(new Date());

    useEffect(() => setIsValid(itemName.length && itemBrand.length && unit > 0), [itemName, itemBrand, unit]);

    const nameTextChangeHandler = (name: string) => {
        setItemName(name);
    }

    const brandTextChangeHandler = (name: string) => {
        setItemBrand(name);
    }

    const addInfoTextChangeHandler = (name: string) => {
        setAddInfo(name);
    }

    const expirationDateChangeHandler = (event, selectedDate) => {
        setExpiration(selectedDate)
    }

    const onAddItem = () => {
        const newItem = new ItemRequest(
            itemName,
            measureType,
            itemBrand,
            addInfo,
            isDatePickerVisible ? expiration.toISOString() : null,
            unit
        )
        navigation.navigate({
            name: 'Items',
            params: { categoryId: categoryId, categoryName: categoryName, item: newItem },
            merge: true,
        })
    }

    return (
        <View>
            <Text style={styles.header}>Add New Item</Text>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Item Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    onChangeText={nameTextChangeHandler}
                />
                <Text style={styles.label}>Brand</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    onChangeText={brandTextChangeHandler}
                />
            </View>
            <MeasurementToggle
                measureType={measureType}
                setMeasureType={setMeasureType}
                unit={unit}
                setUnit={setUnit}
            ></MeasurementToggle>
            <View style={styles.formContainer}>
                <View style={styles.expContainer}>
                    <Text style={styles.expText}>Add Expiration Date</Text>
                    <AddButton
                        onPressHandler={() => setIsDatePickerVisible(!isDatePickerVisible)}
                        style={{ marginRight: 0 }}
                    ></AddButton>
                </View>
                {isDatePickerVisible ? <DateTimePicker
                    testID="dateTimePicker"
                    value={expiration}
                    display={'default'}
                    mode={'date'}
                    onChange={expirationDateChangeHandler}
                    style={styles.datePicker}
                /> : <></>}
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Additional Information (optional)</Text>
                <TextInput
                    style={styles.input}
                    placeholder=""
                    onChangeText={addInfoTextChangeHandler}
                />
            </View>
            <AcceptButton
                style={styles.button}
                title={'Add to Inventory'}
                onPressHandler={onAddItem}
                disabled={!isValid}
            ></AcceptButton>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        fontWeight: '700',
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 10,
        marginTop: 35,
        textAlign: "center",
    },
    label: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 6,
    },
    formContainer: {
        alignSelf: "center",
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderStyle: 'solid',
        color: '#FFFFFF',
        borderRadius: 6,
        width: 345,
        height: 48,
        borderColor: '#FFFFFF',
        padding: 12,
        marginBottom: 6,
    },
    button: {
        width: 311,
        height: 56,
        backgroundColor: '#667080',
        marginTop: 35,
        overflow: 'hidden',
        marginBottom: 16,
        borderRadius: 6,
        alignSelf: 'center'
    },
    expText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    expContainer: {
        width: 345,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    datePicker: {
        marginTop: 10,
    },
    pressed: {
        opacity: 0.75,
    },
});

export default AddItem;