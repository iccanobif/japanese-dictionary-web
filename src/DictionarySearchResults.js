import React, { Component } from "react";
import "./DictionarySearchResults.css";

function generateInitialState(props) {
  return {
    selectedWordIndex:
      props.results.length > 0 ? props.initialSelectedWordIndex : null,
    previousResults: props.results,
    previousInitialSelectedWordIndex: props.initialSelectedWordIndex,
  };
}

export class DictionarySearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = generateInitialState(props);
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.results !== state.previousResults ||
      props.initialSelectedWordIndex !== state.previousInitialSelectedWordIndex
    ) {
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
            wordData={this.props.results[this.state.selectedWordIndex]}
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

function WordList(props) {
  const words = props.words;
  const selectedWordIndex = props.selectedWordIndex;

  return (
    <div className="word-list">
      {words.map((w, i) => {
        return (
          <button
            key={i}
            value={i}
            onClick={(event) => {
              props.onWordSelected(Number.parseInt(event.target.value));
            }}
            className={
              "link-button " + (i === selectedWordIndex ? "selected-word" : "")
            }
          >
            {w}
          </button>
        );
      })}
    </div>
  );
}

function WordResults(props) {
  if (props.wordData.dictionaryEntries.length === 0)
    return <div>一致する結果はありません</div>;

  const list = props.wordData.dictionaryEntries.map((r, i) => {
    return (
      <DictionaryEntry
        key={i}
        result={r}
        showEnglishGlosses={props.showEnglishGlosses}
      />
    );
  });
  return <>{list}</>;
}

function DictionaryEntry(props) {
  const lemmas = props.result.lemmas.map((lemma, i) => (
    <span key={i}>{lemma.kanji + "（" + lemma.reading + "）"}</span>
  ));

  let glosses;

  if (props.result.englishGlosses.length === 0)
    glosses = props.result.japaneseGlosses;
  else if (props.result.japaneseGlosses.length === 0)
    glosses = props.result.englishGlosses;
  else
    glosses = props.showEnglishGlosses
      ? props.result.englishGlosses
      : props.result.japaneseGlosses;

  return (
    <div className="dictionary-entry">
      {lemmas}
      <br />
      {props.result.accents?.join(" ")}
      <ul>
        {glosses.map((gloss, i) => (
          <li key={i}>{gloss}</li>
        ))}
      </ul>
    </div>
  );
}
