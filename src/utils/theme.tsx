"use client";

export const getPreferredColorScheme = (): string => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const subscribeToColorSchemeChange = (
  callback: (colorScheme: string) => void,
) => {
  const handler = (event: MediaQueryListEvent) => {
    callback(event.matches ? "dark" : "light");
  };

  const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQueryList.addEventListener("change", handler);

  return () => {
    mediaQueryList.removeEventListener("change", handler);
  };
};
