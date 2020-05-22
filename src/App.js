import React, { Component } from "react";
import "./App.css";
import Spinner from "./spinner/spinner";
import { RadicalSearchResults } from "./RadicalSearchResults";
import { DictionarySearchResults } from "./DictionarySearchResults";
import { changeDictionarySearchInput } from "./redux/actions";
import { connect } from "react-redux";

class AppPresentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radicalsQueryResults: null,
      radicalsQuerying: false,
      showEnglishGlosses: false,
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
        <form onSubmit={(event) => event.preventDefault()}>
          <label>部首検索：</label>
          <input type="text"
            onChange={this.handleRadicalDebouncedChange}
            placeholder="英語で部首の名前を入力して下さい"
            tabIndex={1}
            className="text-input"
          />
          <Spinner visible={this.state.radicalsQuerying} />
        </form>
        <RadicalSearchResults
          results={this.state.radicalsQueryResults}
          kanjiClickedCallback={this.appendKanjiToQuery}
        ></RadicalSearchResults>

        <form onSubmit={(event) => event.preventDefault()}>
          <label>辞典検索：</label>

          <input type="text"
            value={this.props.dictionaryQuery}
            onChange={(ev) =>
              this.props.onDictionaryQueryChange(
                ev.target.value,
                ev.target.selectionStart
              )
            }
            placeholder="言葉や文章を入力して下さい"
            /*onKeyUp={this.updateSelectedWord}*/
            /*onClick={this.updateSelectedWord}*/
            /*onFocus={this.updateSelectedWord}*/
            tabIndex={2}
            className="text-input"
          />
          <Spinner visible={this.props.dictionaryQuerying} />
        </form>
        <DictionarySearchResults
          results={this.props.dictionaryQueryResults}
          showEnglishGlosses={this.state.showEnglishGlosses}
        ></DictionarySearchResults>
      </div>
    );
  }

  appendKanjiToQuery = (kanji) => {
    // TODO
  };
  
  handleRadicalDebouncedChange = (ev) => {
    this.doRadicalQuery(ev.target.value);
  };

  handleEnglishFlagChange = (event) => {
    this.setState({
      showEnglishGlosses: event.target.checked,
    });
  };

  doRadicalQuery = (query) => {
    if (!query) {
      this.setState({
        radicalsQueryResults: null,
      });
      return;
    }

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

// Container:

const mapStateToProps = (state) => {
  return {
    dictionaryQueryResults: state.dictionaryQueryResults,
    dictionaryQuery: state.dictionaryQuery,
    dictionaryQuerying: state.dictionaryQuerying,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDictionaryQueryChange: (text, position) =>
      dispatch(changeDictionarySearchInput(text, position)),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppPresentation);
