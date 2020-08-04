import React from 'react';
// Utils
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
// Components
import MainScreen from '../screens/MainScreen';
import PostScreen from '../screens/PostScreen';
import AboutScreen from '../screens/AboutScreen';
import CreateScreen from '../screens/CreateScreen';
import BookedScreen from '../screens/BookedScreen';
import theme from '../theme';

const navigatorOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? theme.MAIN_COLOR : '#fff',
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : theme.MAIN_COLOR,
  }
}

const PostNavigator = createStackNavigator({
    Main: MainScreen,
    Post: PostScreen,
  }, navigatorOptions);

const BookedNavigator = createStackNavigator({
  Booked: BookedScreen,
  Post: PostScreen,
}, navigatorOptions);

const bottomTabsConfig = {
  Post: {
    screen: PostNavigator,
    navigationOptions: {
      tabBarLabel: 'Все',
      tabBarIcon: info => <Ionicons name='ios-albums' size={25} color={info.tintColor} />
    },
  },
  Booked: {
    screen: BookedNavigator,
    navigationOptions: {
      tabBarLabel: 'Избранное',
      tabBarIcon: info => <Ionicons name='ios-star' size={25} color={info.tintColor} />
    },
  }
}

const BottomNavigator = Platform.OS === 'android' 
  ? createMaterialBottomTabNavigator(bottomTabsConfig, {
    activeTintColor: '#fff',
    shifting: true,
    barStyle: {
      backgroundColor: theme.MAIN_COLOR,
    }
  }) 
  : createBottomTabNavigator(bottomTabsConfig, {
      tabBarOptions: {
        activeTintColor: theme.MAIN_COLOR,
      }
  });

  const AboutNavigator = createStackNavigator({
    About: AboutScreen,
  }, navigatorOptions);

  const CreateNavigator = createStackNavigator({
    Create: CreateScreen,
  }, navigatorOptions);

  const MainNavigator = createDrawerNavigator({
    PostTabs: {
      screen: BottomNavigator,
      navigationOptions: {
        drawerLabel: 'Главное',
      }
    },
    About: {
      screen: AboutNavigator,
      navigationOptions: {
        drawerLabel: 'О приложении',
      }
    },
    Create: {
      screen: CreateNavigator,
      navigationOptions: {
        drawerLabel: 'Новый пост',
      }
    },
  }, {
    contentOptions: {
      activeTintColor: theme.MAIN_COLOR,
      labelStyle: {
        fontFamily: 'open-bold',
      }
    }
  })


const AppNavigation = createAppContainer(MainNavigator); 
export default AppNavigation;
