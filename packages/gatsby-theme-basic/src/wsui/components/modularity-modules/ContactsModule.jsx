import { Html } from "@whitespace/gatsby-theme-wordpress-basic/src/wsui/components";
import { TypographyBlock } from "@wsui/base";
import { ContactsModule as WSUIContactsModule } from "@wsui/municipio";
import React from "react";

import ModuleWrapper from "../ModuleWrapper.jsx";

export default function ContactsModule({
  module = {},
  title,
  description,
  ...restProps
}) {
  const { modContactsOptions } = module;

  if (!modContactsOptions) {
    return null;
  }

  const modifiedContacts = modContactsOptions.contacts.map((contact) => {
    const {
      address: incomingAddress,
      visitingAddress: incomingVisitingAddress,
      openingHours: incomingOpeningHours,
      other: incomingOther,
    } = contact;

    const address = incomingAddress && (
      <TypographyBlock>
        <Html>{incomingAddress}</Html>
      </TypographyBlock>
    );
    const visitingAddress = incomingVisitingAddress && (
      <TypographyBlock>
        <Html>{incomingVisitingAddress}</Html>
      </TypographyBlock>
    );
    const openingHours = incomingOpeningHours && (
      <TypographyBlock>
        <Html>{incomingOpeningHours}</Html>
      </TypographyBlock>
    );
    const other = incomingOther && (
      <TypographyBlock>
        <Html>{incomingOther}</Html>
      </TypographyBlock>
    );

    return {
      ...contact,
      address,
      visitingAddress,
      openingHours,
      other,
    };
  });

  return (
    <ModuleWrapper title={title} description={description}>
      <WSUIContactsModule
        contacts={modifiedContacts}
        color="gray.50"
        borderRadius="10px"
        avatarBorder="5px solid"
        avatarBorderColor="gray.150"
        {...restProps}
      />
    </ModuleWrapper>
  );
}
