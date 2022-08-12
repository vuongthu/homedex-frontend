import React from 'react';
import { Image } from "react-native";

type TabIconProps = {
    name: string,
}

export const TabIcon = ({ name }: TabIconProps) => {
    console.log(name)
    return (
        name === 'home-icon' ?
            <Image source={require('../images/home-icon-active.png')}/>
            :
            <Image source={require('../images/heart-symbol-inactive.png')}/>
    );
};