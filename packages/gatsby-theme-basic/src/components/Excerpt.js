import PropTypes from "prop-types";
import React from "react";

Excerpt.propTypes = {
  text: PropTypes.string.isRequired,
};

export default function Excerpt({ text, ...restProps }) {
  let textToDisplay = text.length > 153 ? text.slice(0, 150) + "…" : text;

  return (
    <div {...restProps}>
      <p>{textToDisplay}</p>
    </div>
  );
}
