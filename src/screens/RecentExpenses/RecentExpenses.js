import React, {useState} from 'react';
import {View} from 'react-native';
import ExpensesOutput from '../../components/ExpensesOutput/ExpensesOutput';
import LoadingOverLay from '../../components/UI/LoadingOverLay';
import {useSelector} from 'react-redux';

const RecentExpenses = ({}) => {
  const expenses = useSelector(state => state.expenses);
  return (
    <View style={{flex: 1}}>
      {expenses.loadingExpenses && <LoadingOverLay /> }
      {!expenses.loadingExpenses && <ExpensesOutput
        expensesPeriod="Last 7 days"
        expenses={expenses.recentExpenses}
        fallbackText="No Expenses Registered For the last 7 Days!"
      />}
    </View>
  );
};

export default RecentExpenses;
