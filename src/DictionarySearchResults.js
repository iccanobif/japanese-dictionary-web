import React, { Component } from "react";

function generateInitialState(props) {
  return {
    selectedWordIndex: props.results.length > 0 ? 0 : null,
    previousResults: props.results,
  };
}

export class DictionarySearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = generateInitialState(props);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.results !== state.previousResults) {
      return generateInitialState(props);
    }
    return null;
  }

  render() {
    if (this.props.results.length === 0)
      return <div>一致する結果はありません</div>;

    return (
      <>
        <WordList
          words={this.props.results.map((r) => r.word)}
          onWordSelected={this.handleWordClick}
        ></WordList>
        {this.state.selectedWordIndex == null ? null : (
          <WordResults
            results={
              this.props.results[this.state.selectedWordIndex].dictionaryEntries
            }
          />
        )}
      </>
    );
  }

  handleWordClick = (index) => {
    this.setState({ selectedWordIndex: index });
  };
}

class WordList extends Component {
  render() {
    const words = this.props.words;
    return (
      <div>
        {words.map((w, i) => (
          <button key={i} value={i} onClick={this.handleWordClick}>
            {w}
          </button>
        ))}
      </div>
    );
  }

  handleWordClick = (event) => {
    this.props.onWordSelected(event.target.value);
  };
}

class WordResults extends Component {
  render() {
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
      <div className="dictionary-entry">
        {lemmas}
        <ul>{glosses}</ul>
      </div>
    );
  }
}
