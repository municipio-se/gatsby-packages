let rootElementWrapperPath;

exports.onPreInit = (_, { wsui }) => {
  rootElementWrapperPath = wsui
    ? `@municipio/gatsby-theme-basic/src/wsui/components/RootElementWrapper.jsx`
    : `@municipio/gatsby-theme-basic/src/components/RootElementWrapper.js`;
};

exports.onCreateWebpackConfig = ({ actions, plugins }) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        GATSBY_MUNICIPIO_THEME_BASIC_ROOT_ELEMENT_WRAPPER_PATH: JSON.stringify(
          rootElementWrapperPath,
        ),
      }),
    ],
  });
};
