import React, {useLayoutEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import ManageExpenseForm from '../../components/ManageExpenseForm/ManageExpenseForm';
import IconButton from '../../components/UI/IconButton';
import { fetchExpense, storeExpense } from '../../utils/http';
import {GlobaleStyles} from './../../Constants/styles';
import { useSelector, useDispatch } from 'react-redux'
import { storeAllExpenses, expensesLoadingOn, expensesLoadingOff, setExpensesError } from '../../store/redux/expensesSlice';
import { deleteExpense, updateExpense } from './../../utils/http';
import ErrorOverlay from '../../components/UI/ErrorOverlay';

const ManageExpense = ({route, navigation}) => {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const expensesData = useSelector(state => state.expenses);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [isEditing, navigation]);

  const deleteExpenseHandler = () => {
    dispatch(expensesLoadingOn());
    deleteExpense(expenseId).then(async () => {
      const allExpenses = await fetchExpense();
      dispatch(storeAllExpenses({expenses: allExpenses}));
      stopLoadingExpenses();
      navigation.goBack();
    }).catch((err) => {
      stopLoadingExpenses();
      dispatch(setExpensesError({message: 'Error In Delete expense'}));
    });
  };


  const stopLoadingExpenses = () => {
    setTimeout(() => {
      dispatch(expensesLoadingOff());
    }, 600)
  }

  const CancelExpenseHandler = () => {
    navigation.goBack();
  };

  const ConfirmHandler =  expensesData => {
    dispatch(expensesLoadingOn());
    if (isEditing) {
      updateExpense(expenseId, expensesData).then(async () => {
        const allExpenses = await fetchExpense();
        dispatch(storeAllExpenses({expenses: allExpenses}));
        stopLoadingExpenses();
        CancelExpenseHandler();
      }).catch((err) => {
        dispatch(setExpensesError({message: 'Error updating expense'}));
        stopLoadingExpenses();
        CancelExpenseHandler();
      });
      stopLoadingExpenses();
    } else {
      storeExpense(expensesData).then(async (res) => {
        const getAllExpenses = await fetchExpense();
        dispatch(storeAllExpenses({expenses: getAllExpenses}))
        stopLoadingExpenses();
      }).catch(err => {
        dispatch(setExpensesError({message: 'Error In Add expense'}));
        stopLoadingExpenses();
      });
      CancelExpenseHandler();
    }
  };

  const selectedExpense = expensesData.expenses.find(
    expense => expense.id === expenseId,
  );

  return (
    <View style={styles.container}>
      {!expensesData.loadingExpenses && expensesData.expensesError!=='' && <ErrorOverlay />}
      <View style={styles.subContainer}>
      <ManageExpenseForm
        onCancel={CancelExpenseHandler}
        onSubmit={ConfirmHandler}
        isEditing={isEditing}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="delete"
            size={36}
            color={GlobaleStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
      </View>
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobaleStyles.colors.primary800,
  },
  subContainer:{
    padding: 24,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobaleStyles.colors.primary200,
    alignItems: 'center',
  },
});
