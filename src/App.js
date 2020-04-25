import React, { Component } from 'react';
// import logo from './logo.svg';
//<img src={logo} />
import './App.css';
import Spinner from './spinner/spinner'

export default class App extends Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      queryResults: null,
      query: "",
      querying: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  doQuery(query)
  {
    if (!query)
      return

    this.setState({ querying: true })
    fetch("https://japdictapi.herokuapp.com/dictionary/" + query)
      .then((result) =>
      {
        if (result.ok)
          result.json().then((json =>
          {
            this.setState({
              queryResults: json.reduce((acc, val) => acc.concat(val.glosses), [])
            })
          }))
        else
          alert("error")
        this.setState({ querying: false })
      })
      .catch(err =>
      {
        alert(err)
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
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <input type="text" value={this.state.query} onChange={this.handleChange} />
          <input type="submit" value="検索"></input>
          <Spinner visible={this.state.querying} />
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
    if (this.props.results === null)
      return null
    if (this.props.results.length === 0)
      return (<div>一致する結果はありません</div>)

    const list = this.props.results.map((r, i) => (<li key={i}>{r}</li>))
    return <ul className="meh">{list}</ul>
  }
}
