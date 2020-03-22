import React, { Component } from 'react';
// import logo from './logo.svg';
//<img src={logo} />
import './App.css';

export default class App extends Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      queryResults: ['...']
    }
  }
  componentDidMount()
  {
    fetch("https://www.iccan.us/japanese-api/dictionary/%E3%81%84%E3%81%98%E3%82%87%E3%81%86")
      .then((result) =>
      {
        result.json().then((json =>
        {
          this.setState({queryResults: json.reduce((acc, val) => acc.concat(val.glosses), [])})
        }))
      })
  }

  render()
  {
    return (
      <div className="App">
        <header className="App-header">
          <input type="text"></input>
          <button>Search</button>
          <SearchResults results={this.state.queryResults}></SearchResults>
        </header>
      </div>
    );
  }
}

class SearchResults extends Component
{
  render()
  {
    const list = this.props.results.map((r, i) => (<li key={i}>{r}</li>))
    return <ul className="meh">{list}</ul>
  }
}
