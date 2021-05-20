import { H, Section } from "@jfrk/react-heading-levels";
import { Icon } from "@whitespace/components";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import clsx from "clsx";
import Img from "gatsby-image";
import React from "react";

import * as defaultStyles from "./ContactCardModule.module.css";

const SOCIAL_MEDIA_NAMES = {
  facebook: "Facebook",
  linkedin: "LinkedIn",
  twitter: "Twitter",
  instagram: "Instagram",
};

export default function ContactCardModule({
  styles = defaultStyles,
  className,
  title,
  displayMode,
  isCompact,
  items,
  // ...restProps
}) {
  const { processContent } = useHTMLProcessor();
  const MaybeSection = title ? Section : React.Fragment;
  return (
    <div className={clsx(styles.component, className)}>
      {title && <H>{title}</H>}
      <MaybeSection>
        {items.map((item, index) => {
          return (
            <address
              itemScope=""
              itemType="http://schema.org/Person"
              key={index}
            >
              {item.image && (
                <div>
                  <Img
                    fixed={{
                      width: item.image.width,
                      height: item.image.height,
                      src: item.image.src,
                      srcSet: item.image.srcSet || item.image.src,
                      srcWebp: item.image.srcWebp,
                      srcSetWebp: item.image.srcSetWebp || item.image.srcWebp,
                    }}
                    alt={
                      item.lastName
                        ? `${item.firstName} ${item.lastName}`
                        : item.firstName
                    }
                  />
                </div>
              )}
              <div>
                <H itemProp="name">
                  {item.lastName
                    ? `${item.firstName} ${item.lastName}`
                    : item.firstName}
                </H>
                {item.workTitle && <p itemProp="jobTitle">{item.workTitle}</p>}
                {item.administrationUnit && (
                  <p itemProp="jobTitle">{item.administrationUnit}</p>
                )}
              </div>
              <div>
                <div>
                  {item.email && (
                    <div>
                      <span>E-post</span>
                      <a href={`mailto:${item.email}`} itemProp="email">
                        <Icon name="email-bold" />
                        <span>{item.email}</span>
                      </a>
                    </div>
                  )}
                  {item.phoneNumbers &&
                    item.phoneNumbers.map(({ type, number }, index) => {
                      if (!number) {
                        return null;
                      }
                      let label =
                        type == "phone" ? "Telefonnummer" : "Mobilnummer";
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
                  {item.socialMedia &&
                    item.socialMedia.map(({ media, url }, index) => {
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
                {item.address && (
                  <div>
                    <H>Adress</H>
                    {processContent(item.address)}
                  </div>
                )}
                {item.visitingAddress && (
                  <div>
                    <H>Besöksadress</H>
                    {processContent(item.visitingAddress)}
                  </div>
                )}
                {item.openingHours && (
                  <div>
                    <H>Öppningstider</H>
                    {processContent(item.openingHours)}
                  </div>
                )}
                {item.other && <div>{processContent(item.other)}</div>}
              </div>
            </address>
          );
        })}
      </MaybeSection>
    </div>
  );
}
