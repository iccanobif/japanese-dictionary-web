import React, { Component } from "react";
// import logo from './logo.svg';
//<img src={logo} />
import "./App.css";
import Spinner from "./spinner/spinner";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <RadicalSearch />
        <DictionarySearch />
      </div>
    );
  }
}

class RadicalSearchResults extends Component {
  render() {
    if (this.props.results === null) return null;
    if (this.props.results.length === 0)
      return <div>一致する結果はありません</div>;

    const list = this.props.results
      .slice(0, 20)
      .map((r, i) => <li key={i}>{r}</li>);

    if (this.props.results.length > 20) list.push(<li>...</li>);
    return (
      <>
        <ul className="radical-search-results">{list}</ul>
      </>
    );
  }
}

class RadicalSearch extends Component {
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <label>Radical search:</label>
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
          />
          <Spinner visible={this.state.querying} />
        </form>
        <RadicalSearchResults
          results={this.state.queryResults}
        ></RadicalSearchResults>
      </>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      queryResults: null,
      querying: false,
    };

    // this.handleChange = debounce(this.handleChange, 10).bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  doQuery(query) {
    if (!query) return;

    this.setState({ querying: true });
    fetch("https://japdictapi.herokuapp.com/kanji-by-radical/" + query)
      .then((result) => {
        if (result.ok)
          result.json().then((json) => {
            this.setState({
              queryResults: json,
            });
          });
        else alert("error");
        this.setState({ querying: false });
      })
      .catch((err) => {
        alert(err);
      });
  }

  handleChange(event) {
    const query = event.target.value;

    this.doQuery(query);
  }
}

class DictionarySearch extends Component {
  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className="SearchForm">
        <label>Dictionary search:</label>
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
          />
          <input type="submit" value="検索"></input>
          <Spinner visible={this.state.querying} />
        </form>
        <SearchResults results={this.state.queryResults}></SearchResults>
      </>
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      queryResults: null,
      query: "",
      querying: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  doQuery(query) {
    if (!query) return;

    this.setState({ querying: true });
    fetch("https://japdictapi.herokuapp.com/dictionary/" + query)
      .then((result) => {
        if (result.ok)
          result.json().then((json) => {
            this.setState({
              queryResults: json.reduce(
                (acc, val) => acc.concat(val.glosses),
                []
              ),
            });
          });
        else alert("error");
        this.setState({ querying: false });
      })
      .catch((err) => {
        alert(err);
      });
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  handleSubmit(event) {
    this.doQuery(this.state.query);
    event.preventDefault();
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
