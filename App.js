import React, {useEffect} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ManageExpense from './src/screens/ManageExpense/ManageExpense';
import RecentExpenses from './src/screens/RecentExpenses/RecentExpenses';
import AllExpenses from './src/screens/AllExpenses/AllExpenses';
import {GlobaleStyles} from './src/Constants/styles';
import Icons from 'react-native-vector-icons/MaterialIcons';
import IconButton from './src/components/UI/IconButton';
import {Provider, useDispatch} from 'react-redux';
import {store} from './src/store/redux/store';
import {fetchExpense} from './src/utils/http';
import {storeAllExpenses, expensesLoadingOn, expensesLoadingOff, setExpensesError} from './src/store/redux/expensesSlice';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ExpensiveOverView = () => {
  const dispatch = useDispatch();

  const getAllExpenses = async () => {
    dispatch(expensesLoadingOn());
    try{
      const getAllExpenses = await fetchExpense();
      dispatch(storeAllExpenses({expenses: getAllExpenses}));
    } catch(err) {
      dispatch(setExpensesError({message: 'Error fetching expenses'}));
    }
    stopLoading();
  };

  const stopLoading = () => {
    setTimeout(() => {
      dispatch(expensesLoadingOff());
    }, 600);
  }

  useEffect(() => {
    getAllExpenses();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({navigation}) => ({
        headerStyle: {backgroundColor: GlobaleStyles.colors.primary500},
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        tabBarStyle: {backgroundColor: GlobaleStyles.colors.primary500},
        tabBarActiveTintColor: GlobaleStyles.colors.accent500,
        headerRight: ({tintColor}) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate('ManageExpense')}
          />
        ),
      })}>
      <Tab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}) => (
            <Icons name="hourglass-empty" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({color, size}) => (
            <Icons name="date-range" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {backgroundColor: GlobaleStyles.colors.primary500},
              headerTintColor: 'white',
              headerTitleAlign: 'center',
            }}>
            <Stack.Screen
              name="ExpensiveOverView"
              component={ExpensiveOverView}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
