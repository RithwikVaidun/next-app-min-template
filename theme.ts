"use client";

import { createTheme } from "@mantine/core";

export const theme = createTheme({
  colors: {
    background: [
      "#f0f4f8", // Light background color
      "#e1e8f0",
      "#d2dde8",
      "#c3d2e0",
      "#b4c7d8",
      "#a5bcd0",
      "#96b1c8",
      "#87a6c0",
      "#789bb8",
      "#6990b0",
    ],
    primary: [
      "#e6f7ff",
      "#bae7ff",
      "#91d5ff",
      "#69c0ff",
      "#40a9ff",
      "#1890ff",
      "#096dd9",
      "#0050b3",
      "#003a8c",
      "#002766",
    ],
  },
  primaryColor: "primary",
  primaryShade: 5,
  components: {
    AppShell: {
      styles: {
        main: {
          background: "#f0f4f8", // Set a light background for the entire app
        },
      },
    },
    Paper: {
      styles: {
        root: {
          backgroundColor: "#e1e8f0", // Set a nice color for the Paper component
        },
      },
    },
  },
});
