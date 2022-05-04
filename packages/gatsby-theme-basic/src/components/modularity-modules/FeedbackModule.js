/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";
// import {
//   HTML,
//   TextContent,
// } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
// import clsx from "clsx";
import PropTypes from "prop-types";

import useFeedbackFormContext from "../../hooks/useFeedbackFormContext";
import foldedHandsEmoji from "../../icons/openmoji-folded-hands.svg";
import Box from "../Box";
import FeedbackForm from "../FeedbackForm";
import ModuleWrapper from "../ModuleWrapper";

FeedbackModule.propTypes = {
  // className: PropTypes.string,
  // styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.any,
  module: PropTypes.shape({
    // content: PropTypes.string,
    // contentMedia: PropTypes.arrayOf(PropTypes.object),
    // modFeedbackOptions: PropTypes.shape({
    //   reactions: ,
    // }),
  }),
};

var Emoji = styled.img`
  // :focus + &,
  // :focus-within & {
  //   outline: 2px solid #000;
  // }
  width: 100%;
  max-width: 2em;
  display: block;
  margin: 0rem auto 1rem;
  // display: inline-block;
  // vertical-align: -25%;
`;

export default function FeedbackModule({
  // module,
  title,
  ...restProps
}) {
  const { reactedJustNow, hasRecentReaction, canReact } =
    useFeedbackFormContext();

  if (!canReact) {
    return null;
  }

  const Wrapper = Box;
  // const Wrapper = hideBoxFrame ? "div" : Box;

  let boxTitle = reactedJustNow ? (
    <span>
      <Emoji src={foldedHandsEmoji} /> Tack för din feedback!
    </span>
  ) : hasRecentReaction ? (
    "Du har redan reagerat på den här sidan"
  ) : (
    title
  );

  return (
    <ModuleWrapper
      as={Wrapper}
      {...restProps}
      css={css`
        --box-background: var(--feedback-module-box-background);
        --box-color: var(--feedback-module-box-color);
        --box-font-size: var(--text-module-boxed-font-size, 0.875rem);
        text-align: center;
      `}
      title={boxTitle}
      {...restProps}
    >
      <FeedbackForm
        eventName={title}
        // content={
        //   <TextContent>
        //     <HTML contentMedia={contentMedia}>{content}</HTML>
        //   </TextContent>
        // }
      />
    </ModuleWrapper>
  );
}
