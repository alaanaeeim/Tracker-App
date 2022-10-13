import React from "react";
import { createContext } from "react";

const DUMMY_EXPENSES = [];

export const ExpensesContext = createContext({
    expenses: [],
    updateAllExpensesList: () => {},
    removeExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {},
    loadExpenses: false
});

const ExpensesContentProvider = ({children}) => {
    const [expenses, setExpenses] = React.useState(DUMMY_EXPENSES);
    const [loadExpenses, setLoadExpenses] = React.useState(false);

    const updateAllExpensesList = () => {
        setLoadExpenses(true);
        console.log('updateAllExpensesList updateAllExpensesList ', loadExpenses);
    }

    const removeExpense = (id) => {
        setExpenses(expenses.filter(expense => expense.id !== id));
    }

    const updateExpense = (id, {description, amount, date}) => {
        setExpenses(expenses.map(expense => expense.id === id ? {...expense, description, amount, date} : expense));
    }

    const context = {
        expenses,
        removeExpense,
        updateExpense,
        updateAllExpensesList,
        loadExpenses
    }

    return (
        <ExpensesContext.Provider value={context}>{children}</ExpensesContext.Provider>
    )
}


export default ExpensesContentProvider;
