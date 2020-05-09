import React, { Component } from "react";

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
    // const query = event.target.value;
    // this.setState((state) => {
    //   if (state.handlingCallback)
    //   const result = await this.props.onTextChanged(query);
    //   return { handlingCallback: true };
    // });

    // this.setState({ handlingCallback: true });

    this.props.onTextChanged(event.target.value)
  };
}
