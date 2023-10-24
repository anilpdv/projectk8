import { createTheme, mergeMantineTheme, DEFAULT_THEME } from "@mantine/core";

const themeOverride = createTheme({});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);
