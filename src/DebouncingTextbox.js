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
    return <input type="text" onChange={this.handleTextChange} />;
  }

  handleTextChange = async (event) => {
    event.persist();
    if (!this.debouncedFn) {
      this.debouncedFn = _.debounce(() => {
        this.props.onTextChanged(event.target.value);
      }, 300);
    }
    this.debouncedFn();
  };
}
