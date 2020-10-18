import React from "react";
import Spinner from "./spinner/spinner";

export function RadicalSearch(props)
{
  return (<>
    <form className="main-form" onSubmit={(event) => event.preventDefault()}>
      <input
        type="text"
        onChange={(ev) => props.onRadicalQueryChange(ev.target.value)}
        placeholder="英語で部首の名前を入力して下さい"
        tabIndex={1}
        className="text-input"
      />
      <Spinner visible={props.radicalsIsQueryRunning} />
    </form>
    <RadicalSearchResults
      results={props.radicalsQueryResults}
      kanjiClickedCallback={props.appendKanjiToQuery}
    ></RadicalSearchResults>
  </>)
}

function RadicalSearchResults(props)
{
  if (props.results === null) return null;
  if (props.results.length === 0) return <div>一致する結果はありません</div>;

  const list = props.results.slice(0, 20).map((r, i) => (
    <button
      key={i}
      onClick={(e) => props.kanjiClickedCallback(e.target.value)}
      value={r}
      className="link-button"
    >
      {r}
    </button>
  ));

  if (props.results.length > 20) list.push("...");
  return <>{list}</>;
}
