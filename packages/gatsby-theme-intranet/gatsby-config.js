module.exports = ({ basePath, ...restOptions } = {}) => {
  return {
    plugins: [
      {
        resolve: "@municipio/gatsby-theme-basic",
        options: {
          basePath,
          ...restOptions,
        },
      },
    ],
  };
};
