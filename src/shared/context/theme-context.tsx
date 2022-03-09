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
}

export const ThemeContext = createContext<IThemeContext>({
  colors: theme.colors,
});
