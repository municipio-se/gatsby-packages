import { H, Section } from "@jfrk/react-heading-levels";
import clsx from "clsx";
import React, { useState } from "react";

import useID from "../hooks/id";

import * as defaultStyles from "./ExpandableList.module.css";
import SectionHeader from "./SectionHeader";

export default function ExpandableList({
  styles = defaultStyles,
  className,
  sectionHeader,
  items,
  ...restProps
}) {
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const id = useID();

  let title =
    sectionHeader && sectionHeader.content && sectionHeader.content.title;

  const MaybeSection = title ? Section : React.Fragment;

  return (
    <>
      <SectionHeader
        title={title}
        description={sectionHeader.content.description}
        sectionHeader={sectionHeader.content}
        noMarginBottom={sectionHeader.noMarginBottom}
      />
      <MaybeSection>
        <div className={clsx(styles.component, className)} {...restProps}>
          <ul>
            {items.map((row, index) => (
              <li key={index}>
                <H>
                  <button
                    // id={id(`list-item-headline-${index}`)}
                    aria-expanded={expandedRowIndex === index}
                    aria-controls={id(`list-item-${index}`)}
                    onClick={() => {
                      let newIndex = expandedRowIndex === index ? null : index;
                      setExpandedRowIndex(newIndex);
                    }}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <defs />
                        {expandedRowIndex === index ? (
                          <path d="M12,4.5a2.3,2.3,0,0,1,1.729.78l9.811,11.15a1.847,1.847,0,1,1-2.773,2.439L12.188,9.119a.25.25,0,0,0-.376,0L3.233,18.871A1.847,1.847,0,1,1,.46,16.432L10.268,5.284A2.31,2.31,0,0,1,12,4.5Z" />
                        ) : (
                          <path d="M12,19.5a2.3,2.3,0,0,1-1.729-.78L.46,7.568A1.847,1.847,0,0,1,3.233,5.129l8.579,9.752a.25.25,0,0,0,.376,0l8.579-9.752A1.847,1.847,0,1,1,23.54,7.568L13.732,18.716A2.31,2.31,0,0,1,12,19.5Z" />
                        )}
                      </svg>
                    </div>
                    {row.title}
                  </button>
                </H>
                <div
                  role="region"
                  // aria-labelledby={id(`list-item-headline-${index}`)}
                  id={id(`list-item-${index}`)}
                >
                  <div>{row.content}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </MaybeSection>
    </>
  );
}
