import React, { useState } from "react";
import Spinner from "./spinner/spinner";

export function RadicalSearch(props)
{
  const [selectedIndex, setSelectedIndex] = useState(null)

  const onKeyDown = ({ key }) =>
  {
    console.log(key)
    switch (key)
    {
      case "ArrowUp":
        if (selectedIndex === null) setSelectedIndex(0)
        else if (selectedIndex > 0)
          setSelectedIndex(selectedIndex - 1)
        break;
      case "ArrowDown":
        if (selectedIndex === null) setSelectedIndex(0)
        else if (selectedIndex < 19)
          setSelectedIndex(selectedIndex + 1)
        break;
      case "Enter":
        if (selectedIndex !== null)
          props.appendKanjiToQuery(props.radicalsQueryResults[selectedIndex])
    }
    
    if (props.radicalsQueryResults)
      if (selectedIndex > props.radicalsQueryResults.length - 1)
        setSelectedIndex(0)
  }

  return (<>
    <form className="main-form" onSubmit={(event) => event.preventDefault()}>
      <input
        type="text"
        onChange={(ev) => props.onRadicalQueryChange(ev.target.value)}
        placeholder="英語で部首の名前を入力して下さい"
        tabIndex={1}
        className="text-input"
        onKeyDown={onKeyDown}
      />
      <Spinner visible={props.radicalsIsQueryRunning} />
    </form>
    <RadicalSearchResults
      results={props.radicalsQueryResults}
      kanjiClickedCallback={props.appendKanjiToQuery}
      selectedIndex={selectedIndex}
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
      className={"link-button " + (props.selectedIndex == i ? "selected-radical-button" : "")}
    >
      {r}
    </button>
  ));

  if (props.results.length > 20) list.push("...");
  return <>{list}</>;
}
