import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { GlobaleStyles } from './../Constants/styles';

const ExpenseItem = ({itemData}) => {
  const {id, amount, date, description} = itemData;
  const navigation = useNavigation();

  const expansePressHandler = () => {
    navigation.navigate('ManageExpense', {
      expenseId: id
    });
  }

  return (
    <Pressable onPress={expansePressHandler} style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{description}</Text>
          <Text style={[styles.textBase]}>{date}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75
  },
    expenseItem: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobaleStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobaleStyles.colors.gray500,
        shadowOpacity: 0.4,
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 4,
    },
    textBase: {
        color: GlobaleStyles.colors.primary50,
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    amount: {
        color: GlobaleStyles.colors.primary500,
        fontWeight: 'bold',
    }
});
