import React, { Component } from "react";
import "./App.css";
import Spinner from "./spinner/spinner";
import { RadicalSearchResults } from "./RadicalSearchResults";
import { DictionarySearchResults } from "./DictionarySearchResults";
import DebouncingTextbox from "./DebouncingTextbox"

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
    this.setState((state) => ({
      dictionaryQuery: state.dictionaryQuery + kanji,
    }));
  };

  render() {
    return (
      <div className="App">
        <form className="SearchForm">
          <label>部首検索：</label>
          <DebouncingTextbox onTextChanged={this.handleRadicalChange} />
          <Spinner visible={this.state.radicalsQuerying} />
        </form>
        <RadicalSearchResults
          results={this.state.radicalsQueryResults}
          kanjiClickedCallback={this.appendKanjiToQuery}
        ></RadicalSearchResults>

        <form onSubmit={this.handleDictionarySubmit} className="SearchForm">
          <label>辞典検索：</label>
          <input
            type="text"
            value={this.state.dictionaryQuery}
            onChange={this.handleDictionaryChange}
          />
          <input type="submit" value="検索"></input>
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

  handleDictionarySubmit = (event) => {
    this.doDictionaryQuery(this.state.dictionaryQuery);
    event.preventDefault();
  };

  handleRadicalChange = (query) => {
    this.doRadicalQuery(query);
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
