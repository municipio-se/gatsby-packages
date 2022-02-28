import { mergeThemes } from "@whitespace/components";
import parentTheme from "@whitespace/gatsby-theme-wordpress-basic/src/theme";

import childTheme from "../../../theme";

var theme = mergeThemes(parentTheme, childTheme);

export default theme;
