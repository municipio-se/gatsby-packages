import { H, Section } from "@jfrk/react-heading-levels";
import { Icon } from "@whitespace/components";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import clsx from "clsx";
import Img from "gatsby-image";
import React from "react";

import * as defaultStyles from "./ContactCard.module.css";

const SOCIAL_MEDIA_NAMES = {
  facebook: "Facebook",
  linkedin: "LinkedIn",
  twitter: "Twitter",
  instagram: "Instagram",
};

export default function ContactCard({
  styles = defaultStyles,
  className,
  contact,
  ...restProps
}) {
  const { processContent } = useHTMLProcessor();

  const {
    address,
    administrationUnit,
    email,
    firstName,
    image,
    workTitle,
    visitingAddress,
    other,
    openingHours,
    lastName,
    socialMedia,
    phoneNumbers,
  } = contact;

  return (
    <address itemScope="" itemType="http://schema.org/Person" {...restProps}>
      {image && (
        <div>
          <Img
            fixed={{
              width: image.width,
              height: image.height,
              src: image.src,
              srcSet: image.srcSet || image.src,
              srcWebp: image.srcWebp,
              srcSetWebp: image.srcSetWebp || image.srcWebp,
            }}
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
              {processContent(address)}
            </div>
          )}
          {visitingAddress && (
            <div>
              <H>Besöksadress</H>
              {processContent(visitingAddress)}
            </div>
          )}
          {openingHours && (
            <div>
              <H>Öppningstider</H>
              {processContent(openingHours)}
            </div>
          )}
          {other && <div>{processContent(other)}</div>}
        </div>
      </Section>
    </address>
  );
}
