/** @jsx jsx */
import {
  // css,
  jsx,
} from "@emotion/react";
import PropTypes from "prop-types";

import modularityModuleContext from "../modularityModuleContext";

import ModuleController from "./ModuleController";

WPModularityModule.propTypes = {
  id: PropTypes.string,
  htmlProcessorContext: PropTypes.shape({
    contentModularityModules: PropTypes.array,
  }),
};

export default function WPModularityModule({
  id: moduleDatabaseId,
  htmlProcessorContext: { contentModularityModules },
  ...restProps
}) {
  let module = contentModularityModules?.find(
    (module) => module.databaseId === Number(moduleDatabaseId),
  );
  if (!module) {
    if (process.env.NODE_ENV !== "production") {
      return (
        <pre>
          <code>{`Module with id ${moduleDatabaseId} could not be found. (This message will not be visible in production.)`}</code>
        </pre>
      );
    }
    return null;
  }
  return (
    <modularityModuleContext.Provider
      value={{ hidden: false, module, columnWidth: null, ...restProps }}
    >
      {/* <MaybePageGridGroup> */}
      <ModuleController module={module} />
      {/* </MaybePageGridGroup> */}
    </modularityModuleContext.Provider>
  );
}
