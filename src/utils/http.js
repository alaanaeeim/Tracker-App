import axios from 'axios';
import {formatDates} from './date';

const BACKEND_URL = 'https://tracker-399b6-default-rtdb.firebaseio.com/';

export const storeExpense = expense => {
  return axios.post(BACKEND_URL + 'expenses.json', expense);
};

export const fetchExpense = async () => {
  const responseData = await axios.get(BACKEND_URL + 'expenses.json');
  const expenses = [];

  for (const key in responseData.data) {
    const expenseObj = {
      id: key,
      amount: responseData.data[key].amount,
      date: formatDates(new Date(responseData.data[key].date)),
      description: responseData.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
};

export const deleteExpense = expenseID => {
  return axios.delete(BACKEND_URL + `expenses/${expenseID}.json`);
};

export const updateExpense = (expenseID, expenseData) => {
  return axios.put(BACKEND_URL + `expenses/${expenseID}.json`, expenseData);
};
