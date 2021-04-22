import { Icon } from "@whitespace/components/src";
import { Image } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import clsx from "clsx";
import Carousel from "nuka-carousel";
import React, { useState } from "react";

import SectionHeader from "../SectionHeader";

import * as defaultStyles from "./GalleryModule.module.css";

function NextArrowIcon({ onClick, disabled }) {
  return (
    <button onClick={onClick} aria-label="Nästa bild" disabled={disabled}>
      <Icon name="arrow-right-1" size="12" />
    </button>
  );
}

function PrevArrowIcon({ onClick, disabled }) {
  return (
    <button onClick={onClick} aria-label="Förra bild" disabled={disabled}>
      <Icon name="arrow-left-1" size="12" />
    </button>
  );
}

function ImageDesc({ currentImage: { caption, photograph, databaseId } }) {
  const { processContent } = useHTMLProcessor();
  let credit = photograph && photograph.name;
  let processedCaption = caption && processContent(caption);
  return (
    <div id={`desc-for-image-${databaseId}`}>
      {processedCaption && <>{processedCaption}</>}
      {credit && <p>{"Fotograf: " + credit}</p>}
    </div>
  );
}

export default function GalleryModule({
  styles = defaultStyles,
  className,
  title,
  images,
  ...restProps
}) {
  const [currentImage, setCurrentImage] = useState(images[0]);

  const settings = {
    enableKeyboardControls: true,
    defaultControlsConfig: {
      // pagingDotsContainerClassName: bem("__dots"),
    },
    renderCenterLeftControls({ previousSlide, currentSlide }) {
      const disabled = currentSlide === 0;
      return <PrevArrowIcon onClick={previousSlide} disabled={disabled} />;
    },
    renderCenterRightControls({ nextSlide, currentSlide, slideCount }) {
      const disabled = currentSlide + 1 === slideCount;
      return <NextArrowIcon onClick={nextSlide} disabled={disabled} />;
    },
    renderAnnounceSlideMessage: ({ currentSlide, slideCount }) => {
      return `Bild ${currentSlide + 1} av ${slideCount}`;
    },
    dragging: true,
    slidesToShow: 1,
    afterSlide: (slideIndex) => {
      setCurrentImage(images[slideIndex]);
    },
  };

  return (
    <div className={clsx(styles.component, className)} {...restProps}>
      <SectionHeader title={title} />
      <div>
        <Carousel {...settings}>
          {images.length > 0 &&
            images.map(
              ({ src, srcSet, width, height, altText, databaseId }, index) => {
                return (
                  <Image
                    key={index}
                    base64=""
                    src={src}
                    srcSet={srcSet}
                    aspectRatio={1216 / 532}
                    width={width}
                    height={height}
                    alt={altText}
                    aria-describedby={`desc-for-image-${databaseId}`}
                    role="img"
                    aria-label={altText}
                  />
                );
              },
            )}
        </Carousel>
        <ImageDesc currentImage={currentImage} />
      </div>
    </div>
  );
}
