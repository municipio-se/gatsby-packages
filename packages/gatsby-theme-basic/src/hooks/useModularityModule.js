import { useContext } from "react";

import modularityModuleContext from "../modularityModuleContext";

export default function useModularityModule() {
  return useContext(modularityModuleContext);
}
