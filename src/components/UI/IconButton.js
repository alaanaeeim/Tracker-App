
import React from 'react';
import { Pressable, StyleSheet, View} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';

const IconButton = ({icon, size, color, onPress}) => {
    return (
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed }>
            <View style={styles.buttonContainer}>
            <Icons name={icon} size={size} color={color}  />
            </View>
        </Pressable>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 10
    },
    pressed: {
        opacity: 0.75
    }
});