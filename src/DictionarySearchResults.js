import React, { Component } from "react";
import "./DictionarySearchResults.css";

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
    if (this.props.results.length === 0) return <></>;

    return (
      <>
        <WordList
          words={this.props.results.map((r) => r.word)}
          selectedWordIndex={this.state.selectedWordIndex}
          onWordSelected={this.handleWordClick}
        ></WordList>
        {this.state.selectedWordIndex == null ? null : (
          <WordResults
            results={
              this.props.results[this.state.selectedWordIndex].dictionaryEntries
            }
            showEnglishGlosses={this.props.showEnglishGlosses}
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
    const selectedWordIndex = this.props.selectedWordIndex;

    return (
      <div className="word-list">
        {words.map((w, i) => {
          return (
            <button
              key={i}
              value={i}
              onClick={this.handleWordClick}
              className={
                "link-button " +
                (i === selectedWordIndex ? "selected-word" : "")
              }
            >
              {w}
            </button>
          );
        })}
      </div>
    );
  }

  handleWordClick = (event) => {
    const index = Number.parseInt(event.target.value);
    this.props.onWordSelected(index);
  };
}

class WordResults extends Component {
  render() {
    if (this.props.results.length === 0)
      return <div>一致する結果はありません</div>;

    const list = this.props.results.map((r, i) => {
      return (
        <DictionaryEntry
          key={i}
          result={r}
          showEnglishGlosses={this.props.showEnglishGlosses}
        />
      );
    });
    return <>{list}</>;
  }
}

class DictionaryEntry extends Component {
  render() {
    const lemmas = this.props.result.lemmas.map((lemma, i) => (
      <span key={i}>{lemma}</span>
    ));

    let glosses;

    if (this.props.result.englishGlosses.length === 0)
      glosses = this.props.result.japaneseGlosses;
    else if (this.props.result.japaneseGlosses.length === 0)
      glosses = this.props.result.englishGlosses;
    else
      glosses = this.props.showEnglishGlosses
        ? this.props.result.englishGlosses
        : this.props.result.japaneseGlosses;

    return (
      <div className="dictionary-entry">
        {lemmas}
        <ul>
          {glosses.map((gloss, i) => (
            <li key={i}>{gloss}</li>
          ))}
        </ul>
      </div>
    );
  }
}
