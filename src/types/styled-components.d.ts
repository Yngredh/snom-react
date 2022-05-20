import { theme } from "../themes/theme";


type ThemeInterface = typeof theme

declare module "styled-components" {
  interface DefaultTheme extends ThemeInterface {}
}