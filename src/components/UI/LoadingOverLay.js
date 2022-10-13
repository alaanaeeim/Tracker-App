import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { GlobaleStyles } from "../../Constants/styles";


const LoadingOverLay = () => {
    return <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
    </View>
}

export default LoadingOverLay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobaleStyles.colors.primary700,
    }
})