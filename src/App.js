import React, { Component } from "react";
import "./App.css";
import Spinner from "./spinner/spinner";
import { RadicalSearch } from "./RadicalSearch";
import { DictionarySearchResults } from "./DictionarySearchResults";
import
{
  appendKanji,
  fetchDictionaryResultsIfNeeded,
  changeRadicalSearchInput,
  fetchRadicalResults,
} from "./redux/actions";
import { connect } from "react-redux";
import Alert from 'react-bootstrap/Alert'
import IntegratedDictionaryOpener from './IntegratedDictionaryOpener'

class AppPresentation extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      showEnglishGlosses: false
    };
  }

  handleWindowFocus = () =>
  {
    document.getElementById("dictionaryQueryString").focus();
  };

  componentDidMount()
  {
    window.addEventListener("focus", this.handleWindowFocus);
  }

  componentWillUnmount()
  {
    window.removeEventListener("focus", this.handleWindowFocus);
  }

  render()
  {
    return (
      <div className="App">
        <header>
          <IntegratedDictionaryOpener></IntegratedDictionaryOpener>
          <label>
            英語：
              <input
              type="checkbox"
              onChange={this.handleEnglishFlagChange}
              checked={this.state.showEnglishGlosses}
            ></input>
          </label>
        </header>

        <RadicalSearch
          radicalsIsQueryRunning={this.props.radicalsIsQueryRunning}
          radicalsQueryResults={this.props.radicalsQueryResults}
          appendKanjiToQuery={this.props.appendKanjiToQuery}
          onRadicalQueryChange={this.props.onRadicalQueryChange}
        ></RadicalSearch>

        <form className="main-form" onSubmit={(event) => event.preventDefault()}>
          <input
            id="dictionaryQueryString"
            type="text"
            value={this.props.dictionaryCurrentQueryString}
            placeholder="言葉や文章を入力して下さい"
            onKeyDown={this.onDictionaryInputKeyPress}
            onChange={this.onDictionaryQueryChanged}
            onKeyUp={this.onDictionaryQueryChanged}
            onClick={this.onDictionaryQueryChanged}
            onFocus={this.onDictionaryQueryChanged}
            tabIndex={2}
            className="text-input"
            autoFocus={true}
          />
          <Spinner visible={this.props.dictionaryIsQueryRunning} />
        </form>
        <Alert variant="danger" show={this.props.dictionaryErrorMessage}>
          <Alert.Heading>エラー</Alert.Heading>
          <p>
            {this.props.dictionaryErrorMessage}
          </p>
        </Alert>
        <DictionarySearchResults
          results={this.props.dictionaryQueryResults}
          showEnglishGlosses={this.state.showEnglishGlosses}
          initialSelectedWordIndex={
            this.props.dictionaryInitialSelectedWordIndex
          }
        ></DictionarySearchResults>
      </div>
    );
  }



  onDictionaryQueryChanged = (ev) =>
  {
    this.props.onDictionaryQueryChanged(
      ev.target.value,
      ev.target.selectionStart
    );
  };

  onDictionaryInputKeyPress = (ev) =>
  {
    if (ev.key === "ArrowDown" || ev.key === "ArrowUp")
    {
      this.setState((state) => ({
        showEnglishGlosses: !state.showEnglishGlosses, // I don't know why this doesn't also update the value of the checkbox
      }));
      ev.preventDefault();
    }
  };

  handleEnglishFlagChange = (event) =>
  {
    this.setState({
      showEnglishGlosses: event.target.checked,
    });
  };
}

const mapStateToProps = (state) =>
{
  return {
    dictionaryQueryResults: state.dictionary.queryResults,
    dictionaryCurrentQueryString: state.dictionary.currentQueryString,
    dictionaryIsQueryRunning: state.dictionary.isQueryRunning,
    dictionaryErrorMessage: state.dictionary.errorMessage,
    dictionaryCurrentCursorPosition: state.dictionary.currentCursorPosition,
    dictionaryInitialSelectedWordIndex: state.dictionary.initialSelectedWordIndex,

    radicalsQueryResults: state.radicals.queryResults,
    radicalsIsQueryRunning: state.radicals.isQueryRunning,
  };
};

const mapDispatchToProps = (dispatch) =>
{
  return {
    onDictionaryQueryChanged: (text, position) =>
    {
      dispatch(fetchDictionaryResultsIfNeeded(text, position));
    },
    appendKanjiToQuery: (kanji) =>
    {
      dispatch(appendKanji(kanji));
    },
    onRadicalQueryChange: (text) =>
    {
      dispatch(changeRadicalSearchInput(text));
      dispatch(fetchRadicalResults());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppPresentation);
