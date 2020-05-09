import React, { Component } from "react";
import "./App.css";
import Spinner from "./spinner/spinner";
import { RadicalSearchResults } from "./RadicalSearchResults";
import { DictionarySearchResults } from "./DictionarySearchResults";
import DebouncingTextbox, { otherAttempt } from "./DebouncingTextbox";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dictionaryQueryResults: [],
      dictionaryQuery: "",
      dictionaryQuerying: false,
      radicalsQueryResults: null,
      radicalsQuerying: false,
    };
  }

  appendKanjiToQuery = (kanji) => {
    this.setState((state) => {
      this.doDictionaryQuery(state.dictionaryQuery + kanji);
      return {
        dictionaryQuery: state.dictionaryQuery + kanji,
      };
    });
  };

  render() {
    return (
      <div className="App">
        <form
          className="SearchForm"
          onSubmit={(event) => event.preventDefault()}
        >
          <label>部首検索：</label>
          <DebouncingTextbox
            onDebouncedChange={this.handleRadicalDebouncedChange}
          />
          <Spinner visible={this.state.radicalsQuerying} />
        </form>
        <RadicalSearchResults
          results={this.state.radicalsQueryResults}
          kanjiClickedCallback={this.appendKanjiToQuery}
        ></RadicalSearchResults>

        <form
          onSubmit={(event) => event.preventDefault()}
          className="SearchForm"
        >
          <label>辞典検索：</label>
          <DebouncingTextbox
            value={this.state.dictionaryQuery}
            onChange={this.handleDictionaryChange}
            onDebouncedChange={this.handleDictionaryDebouncedChange}
          />
          <Spinner visible={this.state.dictionaryQuerying} />
        </form>
        <DictionarySearchResults
          results={this.state.dictionaryQueryResults}
        ></DictionarySearchResults>
      </div>
    );
  }

  doDictionaryQuery = (query) => {
    if (!query) return;

    this.setState({ dictionaryQuerying: true });
    fetch("https://japdictapi.herokuapp.com/sentence/" + query)
      .then((result) => {
        if (result.ok)
          result.json().then((json) => {
            this.setState({
              dictionaryQueryResults: json,
            });
          });
        else {
          alert("error");
          console.error(result.statusText);
        }
        this.setState({ dictionaryQuerying: false });
      })
      .catch((err) => {
        alert(err);
      });
  };

  handleDictionaryChange = (event) => {
    this.setState({ dictionaryQuery: event.target.value });
  };

  handleDictionaryDebouncedChange = (text) => {
    this.doDictionaryQuery(text);
  };

  handleRadicalDebouncedChange = (text) => {
    this.doRadicalQuery(text);
  };

  doRadicalQuery = (query) => {
    if (!query) return;

    this.setState({ radicalsQuerying: true });
    fetch("https://japdictapi.herokuapp.com/kanji-by-radical/" + query)
      .then((result) => {
        if (result.ok)
          result.json().then((json) => {
            this.setState({
              radicalsQueryResults: json,
            });
          });
        else alert("error");
        this.setState({ radicalsQuerying: false });
      })
      .catch((err) => {
        alert(err);
      });
  };
}
