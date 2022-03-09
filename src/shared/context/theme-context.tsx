import { createContext } from "react";
import { theme } from "../components/theme";

interface IThemeContext {
  colors: {
    brand: {
      primary: string;
      secondary: string;
      muted: string;
    };
  };
  fonts: {
    body: string;
    heading: string;
    monospace: string;
    fancy: string;
  };
  fontWeights: {
    regular: number;
    medium: number;
    bold: number;
  };
  fontSizes: {
    caption: string;
    button: string;
    title: string;
    h5: string;
    h4: string;
    h2: string;
    h1: string;
  };
  sizes: string[];
  lineHeights: {
    title: string;
    copy: string;
  };
  space: string[];
}

export const ThemeContext = createContext<IThemeContext>({
  colors: theme.colors,
  fonts: theme.fonts,
  fontWeights: theme.fontWeights,
  fontSizes: theme.fontSizes,
  sizes: theme.sizes,
  lineHeights: theme.lineHeights,
  space: theme.space,
});
