import React from "react";
import {Animated, StyleSheet, Text, TouchableHighlight, View} from "react-native";


export default class NoteCard extends React.Component {
  animationProps = {
    height: new Animated.Value(),
    expanded: false,
    contentHeight: 0,
  };

  constructor(props) {
    super(props);

    this._initContentHeight = this._initContentHeight.bind(this);
    this.toggle = this.toggle.bind(this);

    this.animationProps.expanded = props.expanded;
  }

  _initContentHeight(evt) {
    if (this.animationProps.contentHeight > 0) return;
    this.animationProps.contentHeight = evt.nativeEvent.layout.height;
    this.animationProps.height.setValue(this.animationProps.expanded ? this._getMaxValue() : this._getMinValue());
  }

  _getMaxValue() {
    return this.animationProps.contentHeight
  };

  _getMinValue() {
    return 0
  };

  toggle() {
    Animated.timing(this.animationProps.height, {
      toValue: this.animationProps.expanded ? this._getMinValue() : this._getMaxValue(),
      duration: 300,
    }).start();
    this.animationProps.expanded = !this.animationProps.expanded;
  }

  render() {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.title}>
          <TouchableHighlight underlayColor="transparent" onPress={this.toggle}>
            <Text>{this.props.title}</Text>
          </TouchableHighlight>
        </View>

        <Animated.View style={[{height: this.animationProps.height}]} onLayout={this._initContentHeight}>
          {this.props.children}
        </Animated.View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
});