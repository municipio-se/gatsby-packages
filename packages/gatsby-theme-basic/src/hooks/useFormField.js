import { useContext } from "react";

import formFieldContext from "../contexts/formFieldContext";

export default function useFormField() {
  return useContext(formFieldContext);
}
