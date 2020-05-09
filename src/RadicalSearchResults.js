import React, { Component } from "react";

export class RadicalSearchResults extends Component {
  render() {
    if (this.props.results === null) return null;
    if (this.props.results.length === 0)
      return <div>一致する結果はありません</div>;

    const list = this.props.results.slice(0, 20).map((r, i) => (
      <button key={i} onClick={this.kanjiClicked} value={r} className="link-button">
        {r}
      </button>
    ));

    if (this.props.results.length > 20) list.push("...");
    return <div className="clickable-kanjis">{list}</div>;
  }

  kanjiClicked = (e) => {
    const kanji = e.target.value;
    this.props.kanjiClickedCallback(kanji);
  };
}
