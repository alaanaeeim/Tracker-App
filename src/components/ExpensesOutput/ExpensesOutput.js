import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { GlobaleStyles } from './../../Constants/styles';

const ExpensesOutput = ({expenses, expensesPeriod, fallbackText}) => {
  let content = <Text style={styles.infotText}>{fallbackText}</Text>;

  if(expenses.length > 0) {
    content = <ExpensesList expenses={expenses}/>;
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
};

export default ExpensesOutput;


const styles= StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobaleStyles.colors.primary700,
    },
    infotText: {
      color: 'white',
      fontSize: 14,
      textAlign: 'center',
      marginTop: 32,
    }
});