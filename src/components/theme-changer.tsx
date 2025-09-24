"use client";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { IconButton, useTheme as useMuiTheme } from "@mui/material";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import DevicesRoundedIcon from "@mui/icons-material/DevicesRounded";

const ThemeChanger: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const muiTheme = useMuiTheme();

  const handleChangeTheme = () => {
    const newTheme =
      theme === "light" ? "system" : theme === "system" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="fixed right-1 bottom-[calc(env(safe-area-inset-bottom))] z-[10000] md:right-auto md:bottom-3 md:left-5">
      <div className="mb-2">
        <IconButton
          onClick={handleChangeTheme}
          className="flex cursor-pointer overflow-hidden rounded-full p-2"
          aria-label={`Switch to ${theme === "light" ? "System" : theme === "system" ? "Dark" : "Light"}`}
          sx={{
            backdropFilter: "blur(10px)",
            border: `1px solid ${
              muiTheme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.2)"
                : "rgba(0, 0, 0, 0.26)"
            }`,
          }}
        >
          {theme === "light" ? (
            <LightModeRoundedIcon />
          ) : theme === "system" ? (
            <DevicesRoundedIcon />
          ) : (
            <DarkModeRoundedIcon />
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default ThemeChanger;
