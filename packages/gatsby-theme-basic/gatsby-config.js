module.exports = ({ basePath, ...restOptions } = {}) => {
  return {
    plugins: [
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
