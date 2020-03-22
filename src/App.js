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
      queryResults: [],
      query: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  doQuery(query)
  {
    fetch("https://www.iccan.us/japanese-api/dictionary/" + query)
      .then((result) =>
      {
        result.json().then((json =>
        {
          this.setState({ queryResults: json.reduce((acc, val) => acc.concat(val.glosses), []) })
        }))
      })
  }

  handleChange(event)
  {
    this.setState({ query: event.target.value })
  }

  handleSubmit(event)
  {
    this.doQuery(this.state.query)
    event.preventDefault()
  }

  render()
  {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.query} onChange={this.handleChange} />
          <input type="submit" value="Search"></input>
        </form>
        
        <SearchResults results={this.state.queryResults}></SearchResults>

      </div>
    );
  }
}

class SearchResults extends Component
{
  render()
  {
    if (this.props.results.length == 0)
      return (<div>No results found</div>)

    const list = this.props.results.map((r, i) => (<li key={i}>{r}</li>))
    return <ul className="meh">{list}</ul>
  }
}
