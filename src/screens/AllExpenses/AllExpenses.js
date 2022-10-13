import React, {useContext} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import ExpensesOutput from '../../components/ExpensesOutput/ExpensesOutput';
import LoadingOverLay from '../../components/UI/LoadingOverLay';

const AllExpenses = () => {
  const expenses = useSelector(state => state.expenses);
  return (
    <View style={{flex: 1}}>
      {expenses.loadingExpenses && <LoadingOverLay /> }
      {!expenses.loadingExpenses && <ExpensesOutput
        expensesPeriod="Total"
        expenses={expenses.expenses}
        fallbackText="No Registered Expenses Found!"
      />
}
    </View>
  );
};

export default AllExpenses;
