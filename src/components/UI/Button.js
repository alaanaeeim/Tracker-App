
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { GlobaleStyles } from './../../Constants/styles';

const Button = ({children, onPress, mode, style}) => {
    return (
        <View style={style}>
            <Pressable onPress={onPress} style={({pressed}) =>  pressed && styles.pressed}>
                <View style={[styles.button, mode === 'flat' && styles.flat]}>
                    <Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>
                        {children}
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}

export default Button;

const styles = StyleSheet.create({
    button: {
        borderradius: 4,
        padding: 8,
        backgroundColor: GlobaleStyles.colors.primary500,
    },
    flat: {
        backgroundColor: 'transparent',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    flatText: {
        color: GlobaleStyles.colors.primary200,
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobaleStyles.colors.primary100,
        borderradius: 4,
    }
});