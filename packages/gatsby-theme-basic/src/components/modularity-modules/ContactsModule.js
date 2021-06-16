import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";


import ModuleWrapper from "../ModuleWrapper";

import ContactCard from "./ContactCard";
import * as defaultStyles from "./ContactsModule.module.css";



export default function ContactsModule({
  styles = defaultStyles,
  className,
  title,
  module = {},
  ...restProps
}) {
  const { modContactsOptions: { contacts } = {} } = module;
  
  return (
    <ModuleWrapper
      title={title}
      {...restProps}
      className={clsx(styles.component, className)}
    >
      {contacts.map((contact, index) => {
        return <ContactCard contact={contact} key={index} />
      }
      )}
    </ModuleWrapper>
  );
}