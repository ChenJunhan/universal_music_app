import { createAppContainer, createStackNavigator } from 'react-navigation';
// import {  } from 'react-navigation-stack';

import Home from './pages/home';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home
  }
});

export default createAppContainer(AppNavigator);