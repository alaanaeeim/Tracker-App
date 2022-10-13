import {createSlice} from '@reduxjs/toolkit';
import {formatDates, getDateMinusDatse} from '../../utils/date';

const initialState = {
  expenses: [],
  recentExpenses: [],
  loadingExpenses: false,
  expensesError: '',
};

export const ExpensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    storeAllExpenses: (state, action) => {
      state.expenses = action.payload.expenses;

      const recentExpenses = state.expenses?.filter(expense => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDatse(today, 7);
        return (
          expense.date >= formatDates(date7DaysAgo) &&
          expense.date <= formatDates(today)
        );
      });
      state.recentExpenses = recentExpenses;
    },
    expensesLoadingOn: (state, action) => {
      state.loadingExpenses = true;
    },
    expensesLoadingOff: (state, action) => {
      state.loadingExpenses = false;
    },
    setExpensesError: (state, action) => {
      state.expensesError = action.payload.message;
    }
  },
});

// Action creators are generated for each case reducer function
export const {storeAllExpenses, expensesLoadingOn, expensesLoadingOff, setExpensesError} = ExpensesSlice.actions;

export default ExpensesSlice.reducer;
