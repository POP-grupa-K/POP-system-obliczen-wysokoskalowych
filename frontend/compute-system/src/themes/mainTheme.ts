import { createMuiTheme } from "@material-ui/core/styles";

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    tertiary: PaletteColor;
    backgroundColor: PaletteColor;
    white: PaletteColor;
    sLight: PaletteColor;
  }

  interface PaletteOptions {
    tertiary: PaletteColorOptions;
    backgroundColor: PaletteColorOptions;
    white: PaletteColorOptions;
    sLight: PaletteColorOptions;
  }
}

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#3F51B5",
      dark: "#001970",
      light: "#666AD1",
    },
    secondary: {
      main: "#DE3C4B",
      light: "#FF7961",
      dark: "#BA000D",
    },
    tertiary: {
      main: "#27AE60",
      contrastText: "#FFFFFF",
      dark: "#1b7943",
    },
    backgroundColor: {
      main: "#F5F5F6",
      light: "#F9F9F9",
      dark: "#EAEAEA",
    },
    white: {
      main: "#FFFFFF",
    },
    sLight: {
      main: "#FF7961",
    }
  },
});

export default mainTheme;
