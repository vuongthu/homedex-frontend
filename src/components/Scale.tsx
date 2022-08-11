import React from 'react';
import Slider from '@react-native-community/slider';
import { StyleSheet } from "react-native";

type ScaleProps = {
    unit: number;
    setUnit: (value: number) => void;
    style?: {};
};

const Scale = ({ unit, setUnit, style }: ScaleProps) => {
    return (
        <Slider
            style={[styles.slider, style]}
            onValueChange={setUnit}
            thumbImage={require('../images/pointer.png')}
            value={unit}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="#8EA7BA"
            maximumTrackTintColor="#D9D9D9"
        />
    )
}

const styles = StyleSheet.create({
    slider: {
        width: 100,
        height: 40,
    }
})

export default Scale;