import React from 'react';
import {
    launchCameraAsync,
    launchImageLibraryAsync,
    MediaTypeOptions,
    PermissionStatus,
    useCameraPermissions, useMediaLibraryPermissions
} from 'expo-image-picker';
import { Alert, StyleSheet, View } from "react-native";
import TextButton from "./TextButton";

type ImagePickerProps = {
    onPressHandler: (data: string) => void;
    style?: {};
};

const ImagePicker = ({ onPressHandler, style }: ImagePickerProps) => {

    const [cameraPermissionInformation, setCameraPermissionInformation] = useCameraPermissions()
    const [libraryPermissionInformation, setLibraryPermissionInformation] = useMediaLibraryPermissions()

    const verifyCameraPermissions = async () => {
        if (cameraPermissionInformation && cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const cameraPermissionResponse = await setCameraPermissionInformation();
            return cameraPermissionResponse.granted
        }

        if (cameraPermissionInformation && cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('"HomeDex" Would Like to Access the Camera', 'Please allow access to the Camera and try again.')
            return false;
        }

        return true;
    }

    const takeImage = async () => {
        const hasCameraPermission = await verifyCameraPermissions();

        if (!hasCameraPermission) {
            return;
        }

        let result = await launchCameraAsync({
            mediaTypes: MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.1,
            base64: true,
        });

        if (!result.cancelled) {
            onPressHandler(result.base64);
        }
    };

    const verifyLibraryPermissions = async () => {
        if (libraryPermissionInformation && libraryPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const libraryPermissionResponse = await setLibraryPermissionInformation();
            return libraryPermissionResponse.granted
        }

        if (libraryPermissionInformation && libraryPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('"HomeDex" Would Like to Access Photos', 'Please allow access to Photos and try again.')
            return false;
        }

        return true;
    }

    const pickImage = async () => {
        const hasLibraryPermission = await verifyLibraryPermissions()

        if (!hasLibraryPermission) {
            return;
        }

        let result = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.1,
            base64: true,
        });

        if (!result.cancelled) {
            onPressHandler(result?.base64);
        }
    };

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={styles.photoTextContainer}>
                <TextButton text={'Choose Photo'} style={[style]} onPressHandler={pickImage}></TextButton>
                <TextButton text={'Take Photo'} style={[style]} onPressHandler={takeImage}></TextButton>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    photoTextContainer: {
        marginTop: 10,
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
    }
})

export default ImagePicker;