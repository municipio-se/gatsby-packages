module.exports = ({
  basePath,
  fragmentsDir,
  wp,
  postCss,
  compileES6Packages = { modules: [] },
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
          fragmentsDir,
          wp,
          postCss,
        },
      },
    ],
  };
};
