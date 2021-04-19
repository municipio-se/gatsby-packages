import { loadConfig } from "@municipio/gatsby-theme-intranet";

loadConfig();

export const siteMetadata = {
  siteUrl: process.env.GATSBY_SITE_URL,
  title: `Wordpress Starter`,
  description: `Starter site using Wordpress and Gatsby`,
};

export const plugins = [
  "gatsby-plugin-remove-serviceworker",
  {
    resolve: `@municipio/gatsby-theme-intranet`,
    options: {
      basePath: __dirname,
      fragmentsDir: `${__dirname}/src/fragments`,
      wp: {
        url: `${process.env.GATSBY_WORDPRESS_URL}/graphql`,
        refetchInterval: process.env.WORDPRESS_REFETCH_INTERVAL,
      },
      // XXX: postcss.config.js doesn’t seem to load automatically
      postCss: { postcssOptions: require("./postcss.config")() },
      compileES6Packages: {
        modules: ["@whitespace/components"],
      },
    },
  },
];
