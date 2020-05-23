import React from "react";

export function RadicalSearchResults(props) {
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
