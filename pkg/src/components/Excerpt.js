import React from "react";

export default function Excerpt({ text, ...restProps }) {
  let textToDisplay = text.length > 153 ? text.slice(0, 150) + "…" : text;

  return (
    <div {...restProps}>
      <p>{textToDisplay}</p>
    </div>
  );
}
