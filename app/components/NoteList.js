import React from 'react';
import { Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { getNotes } from '../actions'
import NoteCard from './NoteCard';


class NoteList extends React.Component {
  componentDidMount() {
    this.props.getNotes();
  }

  render() {
    return (
        <FlatList
          data={this.props.notes.items}
          renderItem={({ item }) => (
            <NoteCard title={item.title} expanded={false}>
              <Text>{item.content}</Text>
            </NoteCard>
          )}
          keyExtractor={item => item.id.toString()}
        />
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes
  };
};

const mapDispatchToProps = {
  getNotes
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);
