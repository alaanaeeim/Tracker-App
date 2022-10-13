import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import Input from './Input';
import Button from '../UI/Button';
import {formatDates} from '../../utils/date';
import {GlobaleStyles} from '../../Constants/styles';

const ManageExpenseForm = ({onCancel, onSubmit, isEditing, defaultValues}) => {
  const [inputValues, setInputValues] = useState({
    description: {
      value: defaultValues ? defaultValues.description.toString() : '',
      isValid: true,
    },
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date : '',
      isValid: true,
    },
  });

  const inputChangeInputHandler = (inputIdentifier, enteredValue) => {
    setInputValues(currentInputValues => {
      return {
        ...currentInputValues,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  };

  const submitHandler = () => {
    const expensesData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    const amountValid = !isNaN(expensesData.amount) && expensesData.amount > 0;
    const dateValid = expensesData.date.toString() !== 'Invalid Date';
    const descriptionValid = expensesData.description.trim().length > 0;

    if (amountValid && dateValid && descriptionValid) {
      onSubmit(expensesData);
    } else {
      setInputValues(currentInputValues => {
        return {
          amount: {...currentInputValues.amount, isValid: amountValid},
          date: {...currentInputValues.date, isValid: dateValid},
          description: {
            ...currentInputValues.description,
            isValid: descriptionValid,
          },
        };
      });
      console.log(inputValues);
      return;
    }
  };

  const formIsValid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          isValid={!inputValues.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangeInputHandler.bind(this, 'amount'),
            value: inputValues.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          isValid={!inputValues.date.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangeInputHandler.bind(this, 'date'),
            value: inputValues.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        isValid={!inputValues.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeInputHandler.bind(this, 'description'),
          value: inputValues.description.value,
        }}
      />

      {formIsValid && (
        <Text style={styles.errorText}>
          Invalid Input Value - Please Check Your Entered Data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button mode="flat" style={styles.button} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
    </View>
  );
};

export default ManageExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: GlobaleStyles.colors.error500,
    marginVertical: 16,
  },
});
