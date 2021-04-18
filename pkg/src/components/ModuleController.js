import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import React from "react";

import * as moduleComponents from "./modularity-modules";

export default function ModuleController({ moduleType, module }) {
  const { processContent } = useHTMLProcessor();
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
    case "mod-fileslist":
      return (
        <moduleComponents.FileModule
          key={module.id}
          files={module.files.fileList}
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
    case "mod-image":
      if (
        !module.image ||
        !module.image.modImageImage ||
        !module.image.modImageImage.mediaDetails
      ) {
        return null;
      }
      return (
        <moduleComponents.ImageModule
          title={!module.hideTitle && module.title}
          linkTo={module.image.modImageLinkUrl}
          caption={
            module.image.modImageCaption
              ? module.image.modImageCaption
              : processContent(module.image.modImageImage?.caption)
          }
          credit={module.image.modImageImage?.photograph?.name}
          base64={module.image.modImageImage?.base64}
          src={module.image.modImageImage?.src}
          srcSet={module.image.modImageImage?.srcSet}
          srcWebp={module.image.modImageImage?.src}
          srcSetWebp={module.image.modImageImage?.srcSetWebp}
          width={module.image.modImageImage?.mediaDetails?.width}
          height={module.image.modImageImage?.mediaDetails?.height}
          alt={module.image.modImageImage.altText}
          aspectRatio={
            module.image.modImageImage.mediaDetails.width /
            module.image.modImageImage.mediaDetails.height
          }
        />
      );
    case "mod-notice":
      return (
        <moduleComponents.NoticeModule
          headline={!module.hideTitle && module.title}
          description={module.noticeSettings.noticeText}
          type={module.noticeSettings.noticeType}
        />
      );
    case "mod-posts":
      return (
        <moduleComponents.PostsModule
          {...module}
          title={!module.hideTitle && module.title}
        />
      );
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
    case "mod-text":
      return (
        <moduleComponents.TextModule
          title={!module.hideTitle && module.title}
          content={module.content}
          settings={module.textOptions}
          contentMedia={module.contentMedia}
        />
      );
    // case "mod-video":
    //   return (
    //     <VideoModule
    //       title={!module.hideTitle && module.title}
    //       video={module.video}
    //     />
    //   );
    default:
      return null;
  }
}
