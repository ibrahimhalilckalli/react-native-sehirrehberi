import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Search from './src/screens/Search';
import PlaceList from './src/screens/PlaceList';
import PlaceDesc from './src/screens/PlaceDesc';

const App = createStackNavigator({
  Home: {
    screen: Search,
    navigationOptions: {
      headerShown: false,
    },
  },
  Detail: {
    screen: PlaceList,
    navigationOptions: {
      headerShown: false,
    },
  },
  ReviewDetails: {
    screen: PlaceDesc,
    navigationOptions: {
      headerShown: false,
    },
  },
});
export default createAppContainer(App);
