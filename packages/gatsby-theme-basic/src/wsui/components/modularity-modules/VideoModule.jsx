/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useThemeProps } from "@wsui/base";
import urlParser from "js-video-url-parser";

import ModuleWrapper from "../ModuleWrapper.jsx";

function VideoIframe(props) {
  props = useThemeProps({ props, name: "MunicipioVideoIframe" });

  let { url, aspectRatio = "16/9", ...restProps } = props;

  return (
    <iframe
      css={css({
        aspectRatio: aspectRatio.toString(),
        display: "block",
        width: "100%",
        border: "none",
      })}
      src={url}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      {...restProps}
    />
  );
}

export default function VideoModule({ module = {}, title, ...restProps }) {
  const { modVideoOptions: { embedLink } = {} } = module;
  const url = urlParser.create({
    videoInfo: urlParser.parse(embedLink),
    format: "embed",
  });

  return (
    <ModuleWrapper title={title} {...restProps}>
      <VideoIframe url={url} aspectRatio={"16/9"} />
    </ModuleWrapper>
  );
}
