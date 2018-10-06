import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import {
  createStackNavigator, createBottomTabNavigator
} from 'react-navigation';
import { Entypo, FontAwesome  } from '@expo/vector-icons';

import reducers from './app/reducers'
import NoteList from './app/components/NoteList';


// fix for react native upgrade, referenced here: https://github.com/facebook/react-native/issues/9599
// and here: https://github.com/davidvuong/ddfa-rn-app/commit/e54a799a92d28a894b7c1ad6d2e3efc727922069
if (typeof global.self === 'undefined') {
  global.self = global;
}

const client = axios.create({
  baseURL: 'http://localhost:5000',
  responseType: 'json'
});

const store = createStore(reducers, applyMiddleware(axiosMiddleware(client)));

class NotesScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NoteList />
      </View>
    );
  }
}

class SearchScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require('./app/static/images/under-construction.png')} />
        <Text>Under Construction</Text>
      </View>
    );
  }
}

const NotesStack = createStackNavigator(
  {
    Home: NotesScreen
  },
  {
    navigationOptions: {
      title: 'vault'
    }
  }
);

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen
  },
  {
    navigationOptions: {
      title: 'vault'
    }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: NotesStack,
    Search: SearchStack
  },
  {
    navigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) => {
        const {routeName} = navigation.state;
        if (routeName === 'Home') {
          return <Entypo name={'home'} size={25} color={tintColor}/>;
        } else if (routeName === 'Search') {
          return <FontAwesome name={'search'} size={25} color={tintColor}/>;
        }
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      showLabel: false
    },
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <TabNavigator/>
      </Provider>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
