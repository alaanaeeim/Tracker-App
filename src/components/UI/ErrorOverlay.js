import React from 'react';
import {View, StyleSheet, Button, Text, Dimensions, TouchableOpacity} from 'react-native';
import { GlobaleStyles } from '../../Constants/styles';
import {useSelector, useDispatch} from 'react-redux';
import { setExpensesError } from '../../store/redux/expensesSlice';

const ErrorOverlay = () => {
 const expensesData = useSelector(state => state.expenses);
 const dispatch = useDispatch();

 const confirmHandler = () => {
    dispatch(setExpensesError({message: ''}));
 }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>An Error Occures</Text>
      <Text style={styles.title}>{expensesData.expensesError}</Text>
      <TouchableOpacity onPress={confirmHandler}>
        <Text style={styles.btn}>Okay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorOverlay;
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width ,
    height: height,
    padding: 24,
    zIndex: 1,
    backgroundColor: GlobaleStyles.colors.primary700,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 5,
  },
  message: {
    fontSize: 14,
  },
  btn: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 15,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: GlobaleStyles.colors.primary400,
  }
});
