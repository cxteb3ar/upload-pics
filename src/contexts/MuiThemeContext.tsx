"use client";
import React from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@/contexts/ThemeContext";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  shape: {
    borderRadius: 11,
  },
  typography: {
    button: {
      textTransform: "capitalize",
      fontFamily: "var(--font-sans)",
    },
    fontFamily: "var(--font-sans)",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: "0.25rem",
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  shape: {
    borderRadius: 11,
  },
  typography: {
    button: {
      textTransform: "capitalize",
      fontFamily: "var(--font-sans)",
    },
    fontFamily: "var(--font-sans)",
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: "0.375rem",
        },
      },
    },
  },
});

export default function MuiThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { noSystemTheme } = useTheme();

  const currentTheme = noSystemTheme === "dark" ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
