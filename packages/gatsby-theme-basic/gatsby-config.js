module.exports = ({
  basePath,
  compileES6Packages = { modules: [] },
  ...restOptions
} = {}) => {
  return {
    plugins: [
      {
        resolve: `gatsby-plugin-compile-es6-packages`,
        options: compileES6Packages,
      },
      {
        resolve: "@whitespace/gatsby-theme-wordpress-basic",
        options: {
          basePath,
          ...restOptions,
        },
      },
    ],
  };
};
