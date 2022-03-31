/** @jsx jsx */
import {
  // css,
  jsx,
} from "@emotion/react";
import styled from "@emotion/styled";
import { Formik, Form, Field } from "formik";
// import PropTypes from "prop-types";

import useFeedbackFormContext from "../hooks/useFeedbackFormContext";
import clappingHandsEmoji from "../icons/openmoji-clapping-hands.svg";
import disappointedFaceEmoji from "../icons/openmoji-disappointed-face.svg";
import thumbsDownEmoji from "../icons/openmoji-thumbs-down.svg";
import thumbsUpEmoji from "../icons/openmoji-thumbs-up.svg";

FeedbackForm.propTypes = {
  // content: PropTypes.node,
};

var StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

var Label = styled.label`
  cursor: pointer;
  flex: 0 1 4rem;
  min-width: 0;
  // :focus + ${Emoji}, :focus-within ${Emoji} {
  //   outline: 2px solid #000;
  // }
  :focus-within {
    outline: 2px solid #000;
  }
`;

var Input = styled(Field)`
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;
`;

var Emoji = styled.img`
  // :focus + &,
  // :focus-within & {
  //   outline: 2px solid #000;
  // }
  width: 100%;
`;

export default function FeedbackForm({ ...restProps }) {
  const { hasRecentReaction, react, canReact } = useFeedbackFormContext();

  if (!canReact || hasRecentReaction) {
    return null;
  }

  return (
    <div {...restProps}>
      <Formik
        initialValues={{}}
        // validationSchema={validationSchema}
        onSubmit={async ({ reaction }, { setSubmitting }) => {
          react(reaction);
          setSubmitting(false);
        }}
      >
        {({
          // isSubmitting,
          submitForm,
        }) => (
          <StyledForm>
            <Label>
              <Input
                type="radio"
                name="reaction"
                value="celebrate"
                onClick={() => {
                  submitForm();
                }}
              />
              <Emoji src={clappingHandsEmoji} alt="" width="24" />
            </Label>
            <Label>
              <Input
                type="radio"
                name="reaction"
                value="like"
                onClick={() => {
                  submitForm();
                }}
              />
              <Emoji src={thumbsUpEmoji} alt="" width="24" />
            </Label>
            <Label>
              <Input
                type="radio"
                name="reaction"
                value="dislike"
                onClick={() => {
                  submitForm();
                }}
              />
              <Emoji src={thumbsDownEmoji} alt="" width="24" />
            </Label>
            <Label>
              <Input
                type="radio"
                name="reaction"
                value="disappointed"
                onClick={() => {
                  submitForm();
                }}
              />
              <Emoji src={disappointedFaceEmoji} alt="" width="24" />
            </Label>
          </StyledForm>
        )}
      </Formik>
    </div>
  );
}
