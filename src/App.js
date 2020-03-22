import React, { Component } from 'react';
// import logo from './logo.svg';
//<img src={logo} className="App-logo" alt="logo" />
import './App.css';

export default class App extends Component
{
  render()
  {
    const results = ['result 1', 'result 2']

    return (
      <div className="App">
        <header className="App-header">
          <input type="text"></input>
          <SearchResults results={results}></SearchResults>
        </header>
      </div>
    );
  }
}

class SearchResults extends Component
{
  render()
  {
    return this.props.results
      .map(r => (<div>{r}</div>))
  }
}