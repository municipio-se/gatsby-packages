import { useContext } from "react";

import feedbackFormContext from "../contexts/feedbackFormContext";

export default function useFeedbackFormContext() {
  return useContext(feedbackFormContext);
}
