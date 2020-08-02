import React, { Component } from "react";
import "./App.css";
import Spinner from "./spinner/spinner";
import { RadicalSearchResults } from "./RadicalSearchResults";
import { DictionarySearchResults } from "./DictionarySearchResults";
import {
  changeDictionarySearchInput,
  appendKanji,
  fetchDictionaryResults,
  changeRadicalSearchInput,
  fetchRadicalResults,
} from "./redux/actions";
import { connect } from "react-redux";

class AppPresentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEnglishGlosses: false,
      integratedDictionaryTargetUrl: "",
    };
  }

  render() {
    return (
      <div className="App">
        <header>
          <div className="english-flag">
            <label>英語：</label>
            <input
              type="checkbox"
              onChange={this.handleEnglishFlagChange}
            ></input>
          </div>
        </header>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            window.location =
              "http://japdictapi.herokuapp.com/integrated-dictionary/" +
              this.state.integratedDictionaryTargetUrl;
          }}
          style={{ display: "none" }}
        >
          <input
            type="text"
            placeholder="ＵＲＬを入力してＥｎｔｅｒキーを押して下さい"
            onChange={(event) =>
              this.setState({
                integratedDictionaryTargetUrl: event.target.value,
              })
            }
            className="text-input"
          />
        </form>

        <form onSubmit={(event) => event.preventDefault()}>
          <input
            type="text"
            onChange={(ev) => this.onRadicalQueryChange(ev)}
            placeholder="英語で部首の名前を入力して下さい"
            tabIndex={1}
            className="text-input"
          />
          <Spinner visible={this.props.radicalsIsQueryRunning} />
        </form>
        <RadicalSearchResults
          results={this.props.radicalsQueryResults}
          kanjiClickedCallback={this.props.appendKanjiToQuery}
        ></RadicalSearchResults>

        <form onSubmit={(event) => event.preventDefault()}>
          <input
            type="text"
            value={this.props.dictionaryCurrentQueryString}
            placeholder="言葉や文章を入力して下さい"
            onChange={this.onDictionaryQueryChanged}
            onKeyUp={this.onDictionaryQueryChanged}
            onClick={this.onDictionaryQueryChanged}
            onFocus={this.onDictionaryQueryChanged}
            tabIndex={2}
            className="text-input"
          />
          <Spinner visible={this.props.dictionaryIsQueryRunning} />
        </form>
        <DictionarySearchResults
          results={this.props.dictionaryQueryResults}
          showEnglishGlosses={this.state.showEnglishGlosses}
          initialSelectedWordIndex={this.props.dictionaryInitialSelectedWordIndex}
        ></DictionarySearchResults>
      </div>
    );
  }

  onRadicalQueryChange = (ev) => 
  {
    this.props.onRadicalQueryChange(ev.target.value)
  }

  onDictionaryQueryChanged = (ev) => {
    this.props.onDictionaryQueryChanged(
      ev.target.value,
      ev.target.selectionStart
    );
  };

  handleEnglishFlagChange = (event) => {
    this.setState({
      showEnglishGlosses: event.target.checked,
    });
  };
}

const mapStateToProps = (state) => {
  return {
    dictionaryQueryResults: state.dictionary.queryResults,
    dictionaryCurrentQueryString: state.dictionary.currentQueryString,
    dictionaryIsQueryRunning: state.dictionary.isQueryRunning,
    dictionaryCurrentCursorPosition: state.dictionary.currentCursorPosition,
    dictionaryInitialSelectedWordIndex: state.dictionary.initialSelectedWordIndex,

    radicalsQueryResults: state.radicals.queryResults,
    radicalsIsQueryRunning: state.radicals.isQueryRunning,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDictionaryQueryChanged: (text, position) => {
      dispatch(changeDictionarySearchInput(text, position));
      dispatch(fetchDictionaryResults());
    },
    appendKanjiToQuery: (kanji) => {
      dispatch(appendKanji(kanji));
      dispatch(fetchDictionaryResults());
    },
    onRadicalQueryChange: (text) => {
      dispatch(changeRadicalSearchInput(text));
      dispatch(fetchRadicalResults());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppPresentation);
