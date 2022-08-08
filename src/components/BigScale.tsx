import React from 'react';
import Slider from '@react-native-community/slider';
import { StyleSheet } from "react-native";

type ScaleProps = {
    setUnit: (value: number) => void;
};

const Scale = ({ setUnit }: ScaleProps) => {
    return (
        <Slider
            style={styles.slider}
            onValueChange={setUnit}
            thumbImage={require('../images/pointer.png')}
            minimumValue={0}
            maximumValue={100}
        />
    )
}

const styles = StyleSheet.create({
    slider: {
        width: 300,
        height: 40,
        minimumTrackTintColor: '#667080',
        maximumTrackTintColor: '#000000',
    }
})

export default Scale;