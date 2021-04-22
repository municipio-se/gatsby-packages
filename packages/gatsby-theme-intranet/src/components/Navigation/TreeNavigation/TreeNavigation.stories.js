import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs";
import React from "react";
import TreeMenu from "react-simple-tree-menu";

import TreeNavigationItem from "./TreeNavigationItem";

export default {
  title: "Components/Navigation",
  component: TreeNavigation,
  decorators: [withKnobs],
};

export const TreeNavigation = () => {
  let treeData = [
    {
      key: "1",
      label: "Sida 1",
      nodes: [
        {
          key: "1-1",
          label: "Sida 1-1",
          nodes: [],
        },
        {
          key: "1-2",
          label: "Sida 1-2",
          nodes: [],
        },
        {
          key: "1-3",
          label: "Sida 1-3",
          nodes: [],
        },
      ],
    },
    {
      key: "2",
      label: "Sida 2",
      nodes: [],
    },
    {
      key: "3",
      label: "Sida 2",
      nodes: [
        {
          key: "3-1",
          label: "Sida 3-1",
          nodes: [
            {
              key: "3-1-1",
              label: "Sida 3-1-1",
              nodes: [],
            },
            {
              key: "3-1-2",
              label: "Sida 3-1-2",
              nodes: [],
            },
          ],
        },
        {
          key: "3-2",
          label: "Sida 3-2",
          nodes: [],
        },
      ],
    },
  ];

  return (
    <TreeMenu
      hasSearch={false}
      data={treeData}
      onClickItem={({ key, label, ...props }) => {
        // navigate(props.url);
      }}
    >
      {({ items }) => (
        <nav className="navigation navigation--tree hidden-print">
          <h2 className="navigation__label">Innehåll</h2>
          <ul className="navigation__list">
            {items.map((props, index) => (
              <TreeNavigationItem key={index} {...props} />
            ))}
          </ul>
        </nav>
      )}
    </TreeMenu>
  );
};
