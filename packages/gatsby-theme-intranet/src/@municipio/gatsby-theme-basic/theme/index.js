import parentTheme from "@municipio/gatsby-theme-basic/src/theme";
import { mergeThemes } from "@whitespace/components";

import childTheme from "../../../theme";

var theme = mergeThemes(parentTheme, childTheme);

export default theme;
