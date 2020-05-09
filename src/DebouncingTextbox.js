import React, { Component } from "react";
import _ from "lodash";

export default class DebouncingTextbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handlingCallback: false,
      textboxValue: "",
    };
  }

  render() {
    const { onDebouncedChange, onChange, ...otherProps } = this.props;
    return (
      <input type="text" onChange={this.handleTextChange} {...otherProps} />
    );
  }

  handleTextChange = async (event) => {
    if (this.props.onChange) this.props.onChange(event);
    event.persist();
    if (!this.debouncedFn) {
      this.debouncedFn = _.debounce(() => {
        this.props.onDebouncedChange(event.target.value);
      }, 300);
    }
    this.debouncedFn();
  };
}