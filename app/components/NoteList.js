import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { getNotes } from '../actions'
import NoteCard from './NoteCard';


class NoteList extends React.Component {
  componentDidMount() {
    this.props.getNotes();
  }

  render() {
    let noteNodes = this.props.notes.items.map(function(note) {
      return (
        <NoteCard title={note.title} expanded={false} key={note.id.toString()}>
          <Text>{note.content}</Text>
        </NoteCard>
      );
    });

    return (
      <View style={styles.container}>
        <Text>Note count: {noteNodes.length}</Text>
        {noteNodes}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
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
