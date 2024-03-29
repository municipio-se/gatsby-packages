import { H, Section } from "@jfrk/react-heading-levels";
import { Icon } from "@whitespace/components";
import { HTML } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
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
    <address
      itemScope=""
      itemType="http://schema.org/Person"
      className={clsx(styles.component, className)}
      {...restProps}
    >
      {image && (
        <div>
          <Img
            fixed={image}
            alt={lastName ? `${firstName} ${lastName}` : firstName}
          />
        </div>
      )}
      <div>
        <H itemProp="name">
          {lastName ? `${firstName} ${lastName}` : firstName}
        </H>
        {workTitle && <p itemProp="jobTitle">{workTitle}</p>}
        {administrationUnit && <p itemProp="jobTitle">{administrationUnit}</p>}
      </div>
      <Section>
        <div>
          <div>
            {email && (
              <div>
                <span>E-post</span>
                <a href={`mailto:${email}`} itemProp="email">
                  <Icon name="email-bold" />
                  <span>{email}</span>
                </a>
              </div>
            )}
            {phoneNumbers &&
              phoneNumbers.map(({ type, number }, index) => {
                if (!number) {
                  return null;
                }
                let label = type == "phone" ? "Telefonnummer" : "Mobilnummer";
                return (
                  <div key={index}>
                    <span>{label}</span>
                    <div itemProp="telephone">
                      <Icon name={`${type}-bold`} />
                      <span>{number}</span>
                    </div>
                  </div>
                );
              })}
            {socialMedia &&
              socialMedia.map(({ media, url }, index) => {
                return (
                  url && (
                    <div>
                      <a href={url} key={index}>
                        <Icon name={`${media}-bold`} />
                        <span>{SOCIAL_MEDIA_NAMES[media]}</span>
                      </a>
                    </div>
                  )
                );
              })}
          </div>
          {address && (
            <div>
              <H>Adress</H>
              <HTML>{address}</HTML>
            </div>
          )}
          {visitingAddress && (
            <div>
              <H>Besöksadress</H>
              <HTML>{visitingAddress}</HTML>
            </div>
          )}
          {openingHours && (
            <div>
              <H>Öppningstider</H>
              <HTML>{openingHours}</HTML>
            </div>
          )}
          {other && (
            <div>
              <HTML>{other}</HTML>
            </div>
          )}
        </div>
      </Section>
    </address>
  );
}
