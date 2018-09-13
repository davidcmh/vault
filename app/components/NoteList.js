import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { getNotes } from '../actions'


class NoteList extends React.Component {
  componentDidMount() {
    this.props.getNotes();
  }

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );

  render() {
    // add 'key' property required by FlatList
    let items = this.props.notes.items.map(note => ({ key: note.id.toString(), ...note }));
    return (
      <FlatList
        styles={styles.container}
        data={items}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
});

const mapStateToProps = state => {
  return {
    notes: state.notes
  };
};

const mapDispatchToProps = {
  getNotes
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
