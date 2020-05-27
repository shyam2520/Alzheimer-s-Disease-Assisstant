import React, { Component } from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createAppContainer,createBottomTabNavigator} from 'react-navigation';
import * as Permissions from 'expo-permissions';
import Home from './screens/Home';
import CreateTask from './screens/CreateTask';
import TodoStore from './data/TodoStore';
import HomeScreen from './HomeScreen';  
import SearchScreen from './SearchScreen'; 
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import WelcomeScreen from './WelcomeScreen'

const AppNavigator = createStackNavigator(
  {
    Home,
    CreateTask,
  },
  {
    headerMode: 'none',
    navigationOptions : {tabBarIcon : ({tintColor}) => (
      <Icon name="add-circle" style={{color:tintColor}}/>
    )}
  }
);
const AppNavigator1 = createStackNavigator(
  {
    HomeScreen,
    SearchScreen,
  },
  {
    headerMode: 'none',
    navigationOptions : {tabBarIcon : ({tintColor}) => (
      <Icon name="search" style={{color:tintColor}}/>
    )}
  }
)

const AppNavigator2 = createStackNavigator(
  {
    WelcomeScreen,
  },
  {
    headerMode: 'none',
    navigationOptions : {tabBarIcon : ({tintColor}) => (
      <Icon name="home" style={{color:tintColor}}/>
    )}
  }
)

const BottomNav = createBottomTabNavigator(
  {
    Home : AppNavigator2,
    AddRemainder : AppNavigator,
    SearchAnObject : AppNavigator1
  }
)

const AppContainer = createAppContainer(BottomNav);

export default class App extends Component {
  async componentDidMount() {
    await this._askForCalendarPermissions();
    await this._askForReminderPermissions();
  }

  _askForCalendarPermissions = async () => {
    await Permissions.askAsync(Permissions.CALENDAR);
  };

  _askForReminderPermissions = async () => {
    if (Platform.OS === 'android') {
      return true;
    }

    await Permissions.askAsync(Permissions.REMINDERS);
  };

  render() {
    return (
      <TodoStore>
        <AppContainer />
      </TodoStore>
    );
  }
}
