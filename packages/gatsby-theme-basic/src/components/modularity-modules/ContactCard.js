import { H, Section } from "@jfrk/react-heading-levels";
import { Icon } from "@whitespace/components";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import clsx from "clsx";
import Img from "gatsby-image";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./ContactCard.module.css";

ContactCard.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  contact: PropTypes.shape({
    address: PropTypes.string,
    administrationUnit: PropTypes.node,
    email: PropTypes.string,
    firstName: PropTypes.string,
    image: PropTypes.any,
    lastName: PropTypes.string,
    openingHours: PropTypes.string,
    other: PropTypes.string,
    phoneNumbers: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }),
    ),
    socialMedia: PropTypes.arrayOf(
      PropTypes.shape({
        media: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      }),
    ),
    visitingAddress: PropTypes.string,
    workTitle: PropTypes.string,
  }),
};

const SOCIAL_MEDIA_NAMES = {
  facebook: "Facebook",
  linkedin: "LinkedIn",
  twitter: "Twitter",
  instagram: "Instagram",
};

export default function ContactCard({
  className,
  contact,
  styles = defaultStyles,
  ...restProps
}) {
  const { processContent } = useHTMLProcessor();

  const {
    address,
    administrationUnit,
    email,
    firstName,
    image,
    lastName,
    openingHours,
    other,
    phoneNumbers,
    socialMedia,
    visitingAddress,
    workTitle,
  } = contact;

  return (
    <div className={clsx(styles.component, className)} {...restProps}>
      {image && (
        <div className={clsx(styles.photo)}>
          <Img
            fixed={image}
            alt={lastName ? `${firstName} ${lastName}` : firstName}
            className={clsx(styles.image)}
          />
        </div>
      )}
      <div className={clsx(styles.name)}>
        <H>{lastName ? `${firstName} ${lastName}` : firstName}</H>
        {workTitle && <p>{workTitle}</p>}
        {administrationUnit && <p>{administrationUnit}</p>}
      </div>
      <Section>
        <div className={clsx(styles.wrapper)}>
          <div className={clsx(styles.divider)}>
            {email && (
              <div className={clsx(styles.item)}>
                <span className={clsx(styles.label)}>E-post</span>
                <a href={`mailto:${email}`} className={clsx(styles.iconLabel)}>
                  <Icon name="email-bold" />
                  <span>{email}</span>
                </a>
              </div>
            )}
          </div>
          <div className={clsx(styles.columns, styles.divider)}>
            {phoneNumbers &&
              phoneNumbers.map(({ type, number }, index) => {
                if (!number) {
                  return null;
                }
                let label = type == "phone" ? "Telefonnummer" : "Mobilnummer";
                return (
                  <div key={index} className={clsx(styles.item)}>
                    <span className={clsx(styles.label)}>{label}</span>
                    <div className={clsx(styles.iconLabel)}>
                      <Icon name={`${type}-bold`} />
                      <span>{number}</span>
                    </div>
                  </div>
                );
              })}
          </div>
          {socialMedia && (
            <div
              className={clsx(
                styles.columns,
                styles.columnsNarrow,
                styles.divider,
              )}
            >
              {socialMedia &&
                socialMedia.map(({ media, url }, index) => {
                  return (
                    url && (
                      <div className={clsx(styles.social)} key={index}>
                        <a href={url} className={clsx(styles.iconLabel)}>
                          <Icon name={`${media}-bold`} />
                          <span>{SOCIAL_MEDIA_NAMES[media]}</span>
                        </a>
                      </div>
                    )
                  );
                })}
            </div>
          )}
          {(address || visitingAddress) && (
            <div className={clsx(styles.columns, styles.divider)}>
              {address && (
                <div className={clsx(styles.group)}>
                  <H>Adress</H>
                  {processContent(address)}
                </div>
              )}
              {visitingAddress && (
                <div className={clsx(styles.group)}>
                  <H>Besöksadress</H>
                  {processContent(visitingAddress)}
                </div>
              )}
            </div>
          )}
          {openingHours && (
            <div className={clsx(styles.divider)}>
              <H>Öppettider</H>
              {processContent(openingHours)}
            </div>
          )}
          {other && (
            <div className={clsx(styles.group, styles.divider)}>
              {processContent(other)}
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
