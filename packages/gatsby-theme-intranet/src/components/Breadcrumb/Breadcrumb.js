import { Link } from "@whitespace/components/src/components/Link";
import React from "react";

// import "./Breadcrumb.scss";

export default function Breadcrumb({
  namespace = "breadcrumb",
  crumbs,
  className,
  ...restProps
}) {
  return (
    <nav
      aria-label="Brödsmulor"
      className={clsx("breadcrumb", "hidden-print", className)}
      {...restProps}
    >
      <ol className={clsx("breadcrumb__list")}>
        {crumbs.map((crumb, index) => {
          return (
            <li key={index} className={clsx("breadcrumb__item", "text-sm")}>
              <Link
                to={crumb.url}
                className={clsx("breadcrumb__link")}
                aria-current={index === crumbs.length - 1 ? "page" : null}
              >
                {crumb.title}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
