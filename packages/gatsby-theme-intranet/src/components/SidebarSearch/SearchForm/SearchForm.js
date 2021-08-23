import { Icon } from "@whitespace/components";
import cslx from "classnames";
import { navigate } from "gatsby";
import PropTypes from "prop-types";
import qs from "query-string";
import React, { useState } from "react";

// import useSearchSettings from "../../../../hooks/searchSettings";

import * as styles from "./SearchForm.module.css";

SearchForm.propTypes = { placeholderText: PropTypes.string };

export function SearchForm({ placeholderText, ...restprops }) {
  const [searchInput, setSearchInput] = useState(""); //TODO: Get the current query

  // const {
  //   displaySettings: { searchLabelText, searchPlaceholderText },
  // } = useSearchSettings();
  const searchLabelText = "";
  const searchPlaceholderText = "";

  return (
    <form
      className={cslx(styles.component)}
      action={`/sok`}
      method="get"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        navigate(`/sok?${qs.stringify({ query: searchInput })}`);
      }}
      {...restprops}
    >
      <Icon name="search" className={cslx(styles.icon)} size="1rem" />
      <label className={cslx(styles.label, "visually-hidden")}>
        {searchLabelText}
      </label>
      <input
        type="search"
        placeholder={searchPlaceholderText || placeholderText}
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />
    </form>
  );
}
