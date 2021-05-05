import { useContext } from "react";

import modularityAreaContext from "../modularityAreaContext";

export default function useModularityArea() {
  return useContext(modularityAreaContext);
}
