import React, { Component } from "react";

export class DictionarySearchResults extends Component {
  render() {
    if (this.props.results === null) return null;
    if (this.props.results.length === 0)
      return <div>一致する結果はありません</div>;

    const list = this.props.results.map((r, i) => {
      return <DictionaryEntry key={i} result={r} />;
    });
    return <>{list}</>;
  }
}

class DictionaryEntry extends Component {
  render() {
    const lemmas = this.props.result.lemmas.map((lemma, i) => (
      <span key={i}>{lemma}</span>
    ));
    const glosses = this.props.result.glosses.map((gloss, i) => (
      <li key={i}>{gloss}</li>
    ));

    return (
      <div class="dictionary-entry">
        {lemmas}
        <ul>{glosses}</ul>
      </div>
    );
  }
}
