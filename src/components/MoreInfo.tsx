import Tooltip from 'react-native-walkthrough-tooltip';
import React, { useState } from 'react';
import { Image, Pressable, Text } from "react-native";

const MoreInfo = ( { text }) => {

    const [tooltip, setTooltip] = useState(false)

    return (
        <Tooltip
            isVisible={tooltip}
            content={<Text>{text}</Text>}
            onClose={() => setTooltip(false)}
        >
            <Pressable onPress={() => setTooltip(true)}>
                <Image source={require('../images/info-icon.png')}/>
            </Pressable>
        </Tooltip>
    )
}

export default MoreInfo;


