import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expensesSlice';

export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
  },
})