import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import useIsFullWidthPageParent  from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/useIsFullWidthPage";



export default function useIsFullWidthPage() {
  const {
    contentNode: {
      pageAppearance: { template } = {}
    }
  }
    = usePageContext();
  
  return useIsFullWidthPageParent() || template == "landingPage";
}