import React, { createContext, useContext, useState } from "react";
import { Color } from "./screens/constants/TWPalete";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [colorTheme, setColorTheme] = useState("blue");

  // sigurnosni fallback da ne baca grešku
  const themeColor = Color[colorTheme] || Color.blue;

  // theme objekat ako treba ime + primarne boje
  const theme = {
    name: colorTheme,
    primary: themeColor[500],
    accent: themeColor[600]
  };

  return (
    <ThemeContext.Provider
      value={{
        colorTheme,
        setColorTheme,
        theme,
        themeColor
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);