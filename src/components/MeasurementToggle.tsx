import React, { useState } from 'react';
import { StyleSheet, View } from "react-native";
import DuoToggleSwitch from "react-native-duo-toggle-switch";
import Scale from "./Scale";
import Quantity from "./Quantity";
import BigQuantity from "./BigQuantity";
import BigScale from "./BigScale";

const MeasurementToggle = () => {

    const [toggleType, setToggleType] = useState('Quantity')

    return (
        <View style={styles.container}>
            <DuoToggleSwitch
                style={styles.toggle}
                primaryText='Quantity'
                secondaryText='Scale'
                onPrimaryPress={() => setToggleType('Quantity')}
                onSecondaryPress={() => setToggleType('Scale')}
                activeColor='#667080'
                inactiveColor='#DCE3E9'/>
            {toggleType === 'Scale' ? <BigScale></BigScale> : <BigQuantity amount={0}></BigQuantity>}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
    },
    toggle: {
        width: 170,
        alignSelf: "center",
    },
});

export default MeasurementToggle;