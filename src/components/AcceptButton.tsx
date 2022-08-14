import { Pressable, PressableStateCallbackType, StyleSheet, Text } from "react-native";

type AcceptButtonProps = {
    title: string;
    onPressHandler: () => void;
    disabled?: boolean;
    style?: {}
};

const AcceptButton = ({ title, onPressHandler, disabled = false, style }: AcceptButtonProps) => {
    const buttonStyle = ({ pressed }: PressableStateCallbackType) => {
        if (pressed) {
            return [styles.button, style, styles.pressed]
        } else if (disabled) {
            return [styles.button, style, styles.disabled]
        } else {
            return [styles.button, style]
        }
    }

    return (
        <Pressable style={buttonStyle}
                   onPress={() => onPressHandler ? onPressHandler() : console.log("Pressed!")}
                   disabled={disabled}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        color: 'white',
        backgroundColor: '#365F7E',
        padding: 17,
        textAlign: 'center',
        borderRadius: 50,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
    },
    pressed: {
        opacity: 0.75,
    },
    disabled: {
        opacity: 0.25,
    },
});

export default AcceptButton;