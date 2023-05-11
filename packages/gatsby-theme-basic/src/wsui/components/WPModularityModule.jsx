/** @jsx jsx */
import {
  // css,
  jsx,
} from "@emotion/react";
import htmlStringifierContext from "@whitespace/gatsby-theme-wordpress-basic/src/contexts/htmlStringifierContext";
import { DevNotice, useThemeProps } from "@wsui/base";
import { useContext } from "react";

import modularityModuleContext from "../../modularityModuleContext";

import ModuleController from "./ModuleController.jsx";

export default function WPModularityModule(props) {
  props = useThemeProps({ props, name: "WPModularityModule" });
  let { id: moduleDatabaseId, ...restProps } = props;
  let { contentModularityModules } = useContext(htmlStringifierContext);
  let module = contentModularityModules?.nodes?.find(
    (module) => module.databaseId === Number(moduleDatabaseId),
  );
  if (!module) {
    if (process.env.NODE_ENV !== "production") {
      return (
        <DevNotice>
          {`Module with id ${moduleDatabaseId} could not be found. (This message will not be visible in production.)`}
        </DevNotice>
      );
    }
    return null;
  }
  return (
    <modularityModuleContext.Provider
      value={{ hidden: false, module, columnWidth: null, ...restProps }}
    >
      <ModuleController module={module} />
    </modularityModuleContext.Provider>
  );
}
