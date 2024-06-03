const baseTheme = {
  linkColor: {
    dark: '#65D6AD',
    light: '#65D6AD',
  },
  text2: {
    dark: '#7B8794',
    light: '#707070',
  },
  activeLink: {
    dark: '#F5F7FA',
    light: '#FFFFFF',
  },
  borderColor: {
    dark: '#32D3AC',
    light: '#EEEEEE',
  },
};

export const theme = {
  dark: {
    main: '#181A1A',
    secondary: '#242626',
    neutral: '#F5F7FA',
    text: '#FFFFFF',
    text2: baseTheme.text2.dark,
    borderColor: baseTheme.borderColor.dark,
    linkColor: baseTheme.linkColor.dark,
    activeLink: baseTheme.activeLink.dark,
  },
  light: {
    main: '#f7f7f7',
    secondary: '#FFFFFF',
    neutral: '#7B8794',
    text: '#000000',
    text2: baseTheme.text2.light,
    borderColor: baseTheme.borderColor.light,
    linkColor: baseTheme.linkColor.light,
    activeLink: baseTheme.activeLink.light,
  },
};
