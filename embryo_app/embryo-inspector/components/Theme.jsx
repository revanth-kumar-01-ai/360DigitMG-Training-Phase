import { createTheme } from "@mui/material";

export const myTheme = createTheme({
  palette: {
    palette: {
      primary: {
        main: "#2562eb", // Blue
        dark: "#111726", // Dark shade
        contrastText: "#ffffff", // White for contrast
      },
      secondary: {
        main: "#f9fafa", // Light gray background
        contrastText: "#111726", // Dark text for contrast
      },
      background: {
        default: "#f9fafa", // Light gray background
        paper: "#ffffff", // White for paper background
      },
      text: {
        primary: "#111726", // Dark text color
        secondary: "#5fe573", // Light green text (for contrast or highlights)
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  },
});

//
