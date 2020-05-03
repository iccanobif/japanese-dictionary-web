import React, { Component } from "react";

export class DictionarySearchResults extends Component {
    render() {
      if (this.props.results === null) return null;
      if (this.props.results.length === 0)
        return <div>一致する結果はありません</div>;
  
      const list = this.props.results.map((r, i) => <li key={i}>{r}</li>);
      return <ul>{list}</ul>;
    }
  }
  