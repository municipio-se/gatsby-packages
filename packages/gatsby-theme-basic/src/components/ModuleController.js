import { camelCase, upperFirst } from "lodash/fp";
import React from "react";

import * as moduleComponents from "./modularity-modules";

function fromContentTypeToComponentName(contentTypeName) {
  return (
    contentTypeName &&
    upperFirst(camelCase(contentTypeName.replace(/^mod-/, ""))) + "Module"
  );
}

export default function ModuleController({ module }) {
  const moduleType = module?.contentType?.node?.name;
  switch (moduleType) {
    case "mod-contacts":
      return (
        <moduleComponents.ContactCardModule
          title={!module.hideTitle && module.title}
          mode={module.kontakter.displayMode}
          isCompact={module.kontakter.compactMode}
          items={module.kontakter.contacts}
        />
      );
    case "mod-gallery":
      return (
        <moduleComponents.GalleryModule
          key={module.id}
          images={module.gallery.modGalleryImages}
          title={!module.hideTitle && module.title}
        />
      );
    // case "mod-form":
    //   return (
    //     <FormModule
    //       key={module.id}
    //       submissionPublicAct={module.form.submissionPublicAct}
    //       submissionPublicActContent={module.form.submissionPublicActContent}
    //       gdprComplienceNotice={module.form.gdprComplienceNotice}
    //       gdprComplienceNoticeContent={module.form.gdprComplienceNoticeContent}
    //       submissionNotice={module.form.submissionNotice}
    //       submitButtonText={module.form.submitButtonText}
    //       nonce={module.nonce}
    //       id={module.modFormId}
    //       title={!module.hideTitle && module.title}
    //       formFields={module.form.formFields}
    //     />
    //   );
    case "mod-table":
      return (
        <moduleComponents.TableModule
          tableData={{
            title: !module.hideTitle && module.title,
            displayAlternatives: module.tableEditor.modTableClasses,
            textSize: module.tableEditor.modTableSize,
            items: JSON.parse(module.tableEditor.modTable),
          }}
        />
      );
    // case "mod-video":
    //   return (
    //     <VideoModule
    //       title={!module.hideTitle && module.title}
    //       video={module.video}
    //     />
    //   );
    default: {
      let componentName = fromContentTypeToComponentName(moduleType);
      let Component =
        // eslint-disable-next-line import/namespace
        (componentName && moduleComponents[componentName]) ||
        // eslint-disable-next-line import/namespace
        moduleComponents.FallbackModule;
      return (
        <Component module={module} title={!module.hideTitle && module.title} />
      );
    }
  }
}
