import React from "react";

import { Tools as ToolsComponent } from ".";

export default {
  title: "Components/DndMenu",
  component: Tools,
};

export const Tools = () => {
  let tools = [
    {
      id: "1",
      label: "Primula",
      url: "#",
    },
    {
      id: "2",
      label: "Helpdesk",
      url: "#",
    },
    {
      id: "3",
      label: "W3D3",
      url: "#",
    },
    {
      id: "4",
      label: "ComAround",
      url: "#",
    },
    {
      id: "5",
      label: "DuoSTATION",
      url: "#",
    },
    {
      id: "6",
      label: "Photoshop",
      url: "#",
    },
    {
      id: "7",
      label: "Illustrator",
      url: "#",
    },
  ];

  return (
    <ToolsComponent
      items={tools}
      title="myToolsLabel"
      showMoreLabel="Show more"
      showLessLabel="Show less"
    />
  );
};
