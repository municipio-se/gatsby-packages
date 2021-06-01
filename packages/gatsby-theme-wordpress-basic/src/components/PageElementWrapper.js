import { HeadingLevelProvider } from "@jfrk/react-heading-levels";
import { IDContextProvider } from "@jfrk/react-id";
import {
  IconProvider,
  ThemeProvider,
  URLTransformerProvider,
} from "@whitespace/components";
import { StoreProvider } from "@whitespace/gatsby-hooks";
import React, { createContext } from "react";

import { SiteLayout } from "../components";
import { PageContextProvider } from "../hooks";
import theme from "../theme";

export const pageWrapperContext = createContext();

export const PageWrapperContextProvider = pageWrapperContext.Provider;

export default function PageElementWrapper({ pageContext, children }) {
  return (
    <HeadingLevelProvider>
      <IDContextProvider>
        <StoreProvider
          initialState={{
            cookieConsent: { answer: null, answeredAt: null },
          }}
        >
          <PageContextProvider value={pageContext}>
            <ThemeProvider theme={theme}>
              <IconProvider getIconSrc={(name) => `/icons/${name}.svg`}>
                <URLTransformerProvider
                  transformURL={(url) =>
                    url && url.replace(process.env.GATSBY_WORDPRESS_URL, "")
                  }
                >
                  <SiteLayout>{children}</SiteLayout>
                </URLTransformerProvider>
              </IconProvider>
            </ThemeProvider>
          </PageContextProvider>
        </StoreProvider>
      </IDContextProvider>
    </HeadingLevelProvider>
  );
}
