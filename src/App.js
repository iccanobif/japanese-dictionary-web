import React, { Component } from "react";
import "./App.css";
import Spinner from "./spinner/spinner";
import { RadicalSearchResults } from "./RadicalSearchResults";
import { DictionarySearchResults } from "./DictionarySearchResults";
import DebouncingTextbox from "./DebouncingTextbox";
import { changeDictionarySearchInput } from "./redux/actions";
import { connect } from "react-redux";

class AppPresentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // dictionaryQueryResults: [],
      // dictionaryQuery: "",
      // dictionaryQuerying: false,
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
          <DebouncingTextbox
            onDebouncedChange={this.handleRadicalDebouncedChange}
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
          <DebouncingTextbox
            value={this.props.dictionaryQuery}
            onChange={(ev) =>
              this.props.onDictionaryQueryChange(
                ev.target.value,
                ev.target.selectionStart
              )
            }
            onDebouncedChange={this.handleDictionaryDebouncedChange}
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
    // this.setState((state) => {
    //   this.doDictionaryQuery(state.dictionaryQuery + kanji);
    //   return {
    //     dictionaryQuery: state.dictionaryQuery + kanji,
    //   };
    // });
  };
  doDictionaryQuery = (query) => {
    if (!query) {
      this.setState({ dictionaryQueryResults: [] });
      return;
    }

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

  handleDictionaryDebouncedChange = (text) => {
    this.doDictionaryQuery(text);
  };

  handleRadicalDebouncedChange = (text) => {
    this.doRadicalQuery(text);
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

// dictionaryQueryResults: [],
// dictionaryQuery: "",
// dictionaryQuerying: false,

const mapStateToProps = (state) => {
  return {
    // todos: getVisibleTodos(state.todos, state.visibilityFilter)
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

// handleDictionaryChange = (event) => {
//   this.setState({ dictionaryQuery: event.target.value });
//   this.props.dispatch(
//     changeDictionarySearchInput(
//       event.target.value,
//       event.target.selectionStart
//     )
//   );
// };

export default connect(mapStateToProps, mapDispatchToProps)(AppPresentation);
