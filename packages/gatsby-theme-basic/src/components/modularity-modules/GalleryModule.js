import { Icon } from "@whitespace/components";
import { Image } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import clsx from "clsx";
import Carousel from "nuka-carousel";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import ModuleWrapper from "../ModuleWrapper";

import * as defaultStyles from "./GalleryModule.module.css";

GalleryModule.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.any,
  module: PropTypes.shape({
    modGalleryOptions: PropTypes.shape({
      modGalleryImages: PropTypes.array.isRequired,
    }),
    settings: PropTypes.shape({
      display: PropTypes.array,
      pauseOnHover: PropTypes.bool,
    }),
  }),
};

ImageDesc.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  currentImage: PropTypes.shape({
    databaseId: PropTypes.string,
    caption: PropTypes.string,
    credit: PropTypes.string,
  }),
};

function ImageDesc({ styles, currentImage: { databaseId, caption, credit } }) {
  const { t } = useTranslation();
  const { processContent } = useHTMLProcessor();
  const processedCaption = caption && processContent(caption);

  if (!credit && !processedCaption) return null;
  return (
    <div
      className={clsx(styles.imageCaption)}
      id={`desc-for-image-${databaseId}`}
    >
      {processedCaption && <>{processedCaption}</>}
      {credit && (
        <p className={styles.imagePhotographer}>{`${t(
          "Photographer",
        )}: ${credit}`}</p>
      )}
    </div>
  );
}

export default function GalleryModule({
  styles = defaultStyles,
  className,
  module,
  title,
  ...restProps
}) {
  const { t } = useTranslation();

  let images = module?.modGalleryOptions?.modGalleryImages;
  let displaySettings = module?.settings?.display;
  let pauseOnHover = module?.settings?.pauseOnHover;

  if (!images?.length) {
    return null;
  }

  const [currentImage, setCurrentImage] = useState(images[0]);

  displaySettings = Array.isArray(displaySettings) && displaySettings;

  const hidePhotograph =
    displaySettings && displaySettings.includes("hide_photograph");
  const hideCaption = displaySettings && displaySettings.includes("hide_text");
  const activateAutoplay =
    displaySettings && displaySettings.includes("autoplay");

  let [autoplay, setAutoplay] = useState(activateAutoplay);

  const carouselSettings = {
    enableKeyboardControls: true,
    defaultControlsConfig: {
      pagingDotsContainerClassName: styles.dots,
    },
    renderCenterLeftControls: ({ previousSlide, currentSlide }) => {
      const disabled = currentSlide === 0;
      return PrevArrowIcon(previousSlide, disabled);
    },
    renderCenterRightControls: ({ nextSlide, currentSlide, slideCount }) => {
      const disabled = currentSlide + 1 === slideCount;
      return NextArrowIcon(nextSlide, disabled);
    },
    dragging: true,
    renderAnnounceSlideMessage: ({ currentSlide, slideCount }) => {
      return `${t("Photo")} ${currentSlide + 1} ${t("of")} ${slideCount}`;
    },
    slidesToShow: 1,
    afterSlide: (slideIndex) => {
      setCurrentImage(images[slideIndex]);
    },
    wrapAround: true,
    autoplay: autoplay,
    pauseOnHover: autoplay && pauseOnHover,
    keyCodeConfig: {
      pause: [32, 13],
    },
  };

  function NextArrowIcon(onClick, disabled) {
    return (
      <button
        className={clsx(
          styles.arrow,
          styles.arrowNext,
          disabled && styles.arrowDisabled,
        )}
        onClick={onClick}
        aria-label={t("nextImage")}
        disabled={disabled}
      >
        <Icon className={styles.arrowIcon} name="arrow-right" size="12" />
      </button>
    );
  }

  function PrevArrowIcon(onClick, disabled) {
    return (
      <button
        className={clsx(
          styles.arrow,
          styles.arrowPrev,
          disabled && styles.arrowDisabled,
        )}
        onClick={onClick}
        aria-label={t("previousImage")}
        disabled={disabled}
      >
        <Icon className={styles.arrowIcon} name="arrow-left" size="12" />
      </button>
    );
  }

  const toggleAutoplay = (button) => {
    const currentLabel = button.getAttribute("aria-label");

    if (currentLabel === t("Pause")) {
      button.setAttribute("aria-label", t("Play"));
      setAutoplay(false);
    } else {
      button.setAttribute("aria-label", t("Pause"));
      setAutoplay(true);
    }
  };

  return (
    <ModuleWrapper
      title={title}
      className={clsx(styles.component, className)}
      {...restProps}
    >
      <div className={clsx(styles.inner)}>
        <Carousel {...carouselSettings}>
          {images.map((image, index) => (
            <Image
              key={index}
              {...image}
              caption={false}
              credit={false}
              className={styles.item}
            />
          ))}
        </Carousel>
        {activateAutoplay && (
          <button
            className={clsx(
              styles.autoplayControl,
              (currentImage.credit || currentImage.caption) &&
                styles.autoplayControlWithCaption,
            )}
            onClick={(e) => toggleAutoplay(e.target)}
            aria-label={t("Pause")}
          >
            <Icon
              className={styles.autoPlayControlIcon}
              name={autoplay ? "button-pause" : "button-play"}
              size="1.5rem"
            />
          </button>
        )}
      </div>
      <ImageDesc
        styles={styles}
        currentImage={currentImage}
        hideCaption={hideCaption}
        hidePhotograph={hidePhotograph}
      />
    </ModuleWrapper>
  );
}
