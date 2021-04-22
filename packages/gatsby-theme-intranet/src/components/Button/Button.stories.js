/** @jsx jsx */
// import React from "react";
import { css, jsx } from "@emotion/core";
import { Button } from "gatsby-theme-municipio/src/components/Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    type: {
      control: {
        type: "radio",
        options: {
          Link: "",
          Button: "button",
        },
      },
    },
    style: {
      control: {
        type: "select",
        options: {
          Default: "",
          Inverted: "button--inverted",
          Outline: "button--outline",
          Transparent: "button--transparent",
        },
      },
    },
    textSize: {
      control: {
        type: "radio",
        options: {
          Default: "",
          Small: "tiny",
          Large: "large",
        },
      },
    },
    fullSize: {
      control: {
        type: "radio",
        options: {
          Yes: true,
          No: false,
        },
      },
    },
    disabled: {
      control: {
        type: "radio",
        options: {
          Yes: true,
          No: false,
        },
      },
    },
    icon: {
      control: {
        type: "radio",
        options: {
          None: "",
          After: "after",
          Before: "before",
        },
      },
    },
  },
};

export const Default = (args) => {
  const { type, style, title, link, icon, textSize, fullSize, disabled } = args;

  return (
    <div
      style={{
        background: "#f7f7f7",
        width: "100%",
        height: "100px",
        padding: "var(--space-16)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button
        className={style}
        title={title}
        link={type ? "" : link}
        iconAfter={icon == "after" && true}
        iconBefore={icon == "before" && true}
        buttonModifier={textSize}
        fullSize={fullSize}
        disabled={disabled}
      />
    </div>
  );
};

Default.args = {
  type: "",
  title: "Fler kontaktuppgifter",
  link: "#",
  icon: "",
  style: "",
  textSize: "",
  fullSize: false,
  disabled: false,
};
