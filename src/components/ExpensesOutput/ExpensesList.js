import React from 'react';
import {View, Text, FlatList} from 'react-native';
import ExpenseItem from '../ExpenseItem';

const renderExpenseItem = (itemData) => {
    return <ExpenseItem itemData={itemData} />
};

const ExpensesList = ({expenses}) => {
    return (
        <View style={{flex: 1}}>
            <FlatList 
            showsVerticalScrollIndicator={false}
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => renderExpenseItem(item)}
        />
        </View>
    );
}

export default ExpensesList;