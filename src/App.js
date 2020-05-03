import React, { Component } from "react";
// import logo from './logo.svg';
//<img src={logo} />
import "./App.css";
import Spinner from "./spinner/spinner";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dictionaryQueryResults: null,
      dictionaryQuery: "",
      dictionaryQuerying: false,
      radicalsQueryResults: null,
      radicalsQuerying: false,
    };

    this.handleRadicalChange = this.handleRadicalChange.bind(this);
    this.handleDictionaryChange = this.handleDictionaryChange.bind(this);
    this.handleDictionarySubmit = this.handleDictionarySubmit.bind(this);
    this.appendKanjiToQuery = this.appendKanjiToQuery.bind(this);
  }

  appendKanjiToQuery(kanji) {
    this.setState((state) => ({ dictionaryQuery: "merda" }));
  }

  render() {
    return (
      <div className="App">
        <form className="SearchForm">
          <label>部首検索：</label>
          <input type="text" onChange={this.handleRadicalChange} />
          <Spinner visible={this.state.radicalsQuerying} />
        </form>
        <RadicalSearchResults
          results={this.state.radicalsQueryResults}
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
        <SearchResults
          results={this.state.dictionaryQueryResults}
        ></SearchResults>
      </div>
    );
  }

  doDictionaryQuery(query) {
    if (!query) return;

    this.setState({ dictionaryQuerying: true });
    fetch("https://japdictapi.herokuapp.com/dictionary/" + query)
      .then((result) => {
        if (result.ok)
          result.json().then((json) => {
            this.setState({
              dictionaryQueryResults: json.reduce(
                (acc, val) => acc.concat(val.glosses),
                []
              ),
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
  }

  handleDictionaryChange(event) {
    this.setState({ dictionaryQuery: event.target.value });
  }

  handleDictionarySubmit(event) {
    this.doDictionaryQuery(this.state.dictionaryQuery);
    event.preventDefault();
  }

  handleRadicalChange(event) {
    const query = event.target.value;

    this.doRadicalQuery(query);
  }

  doRadicalQuery(query) {
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
  }
}

class RadicalSearchResults extends Component {
  render() {
    if (this.props.results === null) return null;
    if (this.props.results.length === 0)
      return <div>一致する結果はありません</div>;

    const list = this.props.results.slice(0, 20).map((r, i) => (
      <button key={i} onClick={this.kanjiClicked} value={r}>
        {r}
      </button>
    ));

    if (this.props.results.length > 20) list.push("...");
    return <div className="clickable-kanjis">{list}</div>;
  }

  constructor(props) {
    super(props);
    this.kanjiClicked = this.kanjiClicked.bind(this);
  }

  kanjiClicked(param) {
    const kanji = param.target.value;
    alert(kanji);
  }
}

class SearchResults extends Component {
  render() {
    if (this.props.results === null) return null;
    if (this.props.results.length === 0)
      return <div>一致する結果はありません</div>;

    const list = this.props.results.map((r, i) => <li key={i}>{r}</li>);
    return <ul>{list}</ul>;
  }
}
