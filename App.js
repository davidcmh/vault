import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

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

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <NoteList />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50
  }
});
