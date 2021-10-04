import { H, Section } from "@jfrk/react-heading-levels";
import {
  Link,
  Time,
} from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import parseDate from "date-fns/parse";
import sortBy from "lodash/sortBy";
import React from "react";

import { getMainArchivePageTitleFromPageContext } from "../contentType";

export default function StaticMainArchive() {
  const pageContext = usePageContext();
  const { years } = pageContext;

  return (
    <div className="c-article o-margin-top-large">
      <div className="o-grid">
        <div className="o-grid-row">
          <div className="o-grid-block o-grid-block--inherit">
            <H className="c-article__title c-archive__title">
              {getMainArchivePageTitleFromPageContext(pageContext)}
            </H>
            <Section>
              {years.length ? (
                <ul className="c-list c-list--wrapper">
                  {years.map(({ year, url, months }) => {
                    let sortedMonths = sortBy(months, "month");
                    let date = parseDate(year, "yyyy", new Date());

                    return (
                      <li key={year} className="c-archive__result">
                        <Link to={url} className="c-archive__heading">
                          <Time date={date} format={{ year: "numeric" }} />
                        </Link>
                        <ul className="c-list">
                          {sortedMonths.map(({ month, url, postCount }) => {
                            let date = parseDate(month, "yyyy/MM", new Date());
                            return (
                              <li key={month} className="c-archive__result">
                                <Link to={url}>
                                  <Time
                                    date={date}
                                    format={{ month: "long" }}
                                    capitalize={true}
                                  />
                                </Link>
                                {` (${postCount})`}
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="c-text-module-card">
                  <p>Arkivet är tomt</p>
                </div>
              )}
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}