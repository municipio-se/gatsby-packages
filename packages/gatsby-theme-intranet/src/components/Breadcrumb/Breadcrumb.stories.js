import React from "react";

import Breadcrumb from "./Breadcrumb";

export default {
  title: "Components/Breadcrumb",
};

export const standard = () => (
  <Breadcrumb
    crumbs={[
      { label: "Hem", url: "#" },
      { label: "Nyhetsarkiv", url: "#" },
      { label: "2020", url: "#" },
      { label: "Mars", url: "#" },
      { label: "Badhuset stängt från och med idag", url: "#" },
    ]}
  />
);
