import { createTheme } from "@mui/material";

export const myTheme = createTheme({
    palette: {
        primary: {
          main: "#1073E5",                               // 🔵 Main color
          light: "#eff8ff",                             // 🧊 Light version
          dark: "#111726",                             // ⚫ Dark version
          contrastText: "#e6e6e6",                    // ⚪ Text on primary
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
})