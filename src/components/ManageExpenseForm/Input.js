import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {GlobaleStyles} from '../../Constants/styles';

const Input = ({label, style, isValid, textInputConfig}) => {
    const inputStyles = [styles.input];
    if(textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiLine);
    }

    if(isValid) {
        inputStyles.push(styles.invalidInput);
    }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, isValid && styles.invalidLabel]}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    color: GlobaleStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobaleStyles.colors.primary100,
    color: GlobaleStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiLine: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobaleStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobaleStyles.colors.error50,
  }
});
