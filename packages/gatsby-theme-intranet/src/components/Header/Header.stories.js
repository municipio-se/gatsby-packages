import React from "react";

import Header from "./Header";

export default {
  title: "Components/Header",
  component: Header,
  argTypes: {
    displayProfileImage: {
      control: {
        type: "radio",
        options: {
          Yes: true,
          No: false,
        },
      },
    },
  },
};

export const standard = (args) => {
  const { displayProfileImage, altText } = args;
  return (
    <Header
      image={{
        base64:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QDgRXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAABIAAAAAQAAAEgAAAABAAAABwAAkAcABAAAADAyMTABkQcABAAAAAECAwCGkgcAFwAAAMAAAAAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAAA8AAAADoAQAAQAAAAoAAAAAAAAAQVNDSUkAAABQaWNzdW0gSUQ6IDEwMjYA/9sAQwAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQy/9sAQwEJCQkMCwwYDQ0YMiEcITIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy/8IAEQgACgAPAwEiAAIRAQMRAf/EABcAAAMBAAAAAAAAAAAAAAAAAAIDBAX/xAAUAQEAAAAAAAAAAAAAAAAAAAAD/9oADAMBAAIQAxAAAAE04sxr/8QAGxAAAgEFAAAAAAAAAAAAAAAAAQMCAAUVMTL/2gAIAQEAAQUCQbfINx4pWp9f/8QAFhEBAQEAAAAAAAAAAAAAAAAAEQAB/9oACAEDAQE/ATC//8QAFhEBAQEAAAAAAAAAAAAAAAAAEQAB/9oACAECAQE/AcW//8QAGxAAAgEFAAAAAAAAAAAAAAAAAAEQESExcaL/2gAIAQEABj8CuqbRnkUf/8QAGhAAAgIDAAAAAAAAAAAAAAAAASEAMRARUf/aAAgBAQABPyHWle8OgWU2FfP/2gAMAwEAAgADAAAAEMf/xAAWEQEBAQAAAAAAAAAAAAAAAAABEQD/2gAIAQMBAT8QTub/xAAWEQEBAQAAAAAAAAAAAAAAAAABABH/2gAIAQIBAT8QTZt//8QAGxABAAMBAAMAAAAAAAAAAAAAAQARITFBUWH/2gAIAQEAAT8Q2BBVEv3FrJdNZGzNeuhCFRWHIsfGZP/Z",
        src: displayProfileImage && "https://picsum.photos/id/1026/1500/1000",
        srcSet: "https://picsum.photos/id/1026/28/28",
        srcWebp: "",
        srcSetWebp: "",
        alt: { altText },
      }}
    />
  );
};

standard.args = {
  displayProfileImage: "",
  altText: "",
};
