import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    blue: {
      information: "#155BCB",
    },
    gray: {
      bg: "#FFFFFF",
      0: "#F5F5F5",
      100: "#E0E0E0",
      200: "#999999",
      300: "#828282",
      600: "#333333",
    },
    red: {
      secondary: "#EB5757",
      error: "#E60000",
    },
    green: {
      primary: "#27AE60",
      success: "#168821",
    },
    yellow: {
      warning: "#FFCD07",
    },
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  fontSizes: {
    xs: "0.75rem", //12px
    sm: "0.875rem", //14px
    md: "1rem", //16px
    lg: "1.125rem", //18px
    xl: "1.375rem", //22px
    "2xl": "1.625rem", //26px
  },
  styles: {
    global: {
      body: {
        bgColor: "#FFFFFF",
        color: "gray.900",
      },
    },
  },
});
