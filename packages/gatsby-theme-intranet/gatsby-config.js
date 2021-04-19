module.exports = ({
  basePath,
  fragmentsDir,
  wp,
  postCss,
  compileES6Packages,
} = {}) => {
  return {
    plugins: [
      {
        resolve: "@municipio/gatsby-theme-basic",
        options: {
          basePath,
          fragmentsDir,
          wp,
          postCss,
          compileES6Packages
        },
      },
    ],
  };
};
