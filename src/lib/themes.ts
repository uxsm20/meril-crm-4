import { type ClassValue } from "clsx";

// Color palette inspired by medical devices and modern healthcare
export const THEME = {
  colors: {
    // Primary - A professional teal representing medical precision
    primary: {
      50: "#E6FBF9",
      100: "#CCF7F3",
      200: "#99EFE7",
      300: "#66E7DB",
      400: "#33DFCF",
      500: "#00D7C3", // Primary brand color
      600: "#00AC9C",
      700: "#008175",
      800: "#00564E",
      900: "#002B27"
    },
    // Secondary - A calming blue representing trust and reliability
    secondary: {
      50: "#E6F6FF",
      100: "#CCE8FF",
      200: "#99D1FF",
      300: "#66BAFF",
      400: "#33A3FF",
      500: "#008CFF", // Secondary brand color
      600: "#0070CC",
      700: "#005499",
      800: "#003866",
      900: "#001C33"
    },
    // Accent colors for medical categories
    cardio: "#FF4D4D", // Cardiovascular
    ortho: "#4D7CFF", // Orthopedic
    surgery: "#00D7C3", // Endo-surgery
    diagnostic: "#B94DFF" // Diagnostics
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
  },
  typography: {
    fonts: {
      sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    },
    sizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem"
    }
  },
  spacing: {
    px: "1px",
    0: "0",
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem",
    2: "0.5rem",
    2.5: "0.625rem",
    3: "0.75rem",
    3.5: "0.875rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    11: "2.75rem",
    12: "3rem",
    14: "3.5rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    28: "7rem",
    32: "8rem",
    36: "9rem",
    40: "10rem",
    44: "11rem",
    48: "12rem",
    52: "13rem",
    56: "14rem",
    60: "15rem",
    64: "16rem",
    72: "18rem",
    80: "20rem",
    96: "24rem"
  }
} as const;

// Design tokens for consistent styling
export const tokens = {
  borderRadius: {
    none: "0",
    sm: "0.25rem",
    DEFAULT: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px"
  },
  animation: {
    DEFAULT: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
    fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "300ms cubic-bezier(0.4, 0, 0.2, 1)"
  }
} as const;