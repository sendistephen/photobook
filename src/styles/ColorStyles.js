const createTheme = (mode, colors) => ({
  ...colors[mode],
  linkColor: colors.linkColor,
  skeletonBase: colors.skeletonBase[mode],
  skeltonHighlight: colors.skeltonHighlight[mode],
});

const baseColors = {
  linkColor: '#65D6AD',
  skeletonBase: {
    dark: '#222222',
    light: '#e0e0e0',
  },
  skeltonHighlight: {
    dark: '#292929',
    light: '#f0f0f0',
  },
  dark: {
    main: '#181A1A',
    secondary: '#242626',
    neutral: '#F5F7FA',
    text: '#FFFFFF',
    text2: '#7B8794',
    borderColor: '#32D3AC',
    activeLink: '#F5F7FA',
  },
  light: {
    main: '#f7f7f7',
    secondary: '#FFFFFF',
    neutral: '#7B8794',
    text: '#000000',
    text2: '#707070',
    borderColor: '#EEEEEE',
    activeLink: '#FFFFFF',
  },
};

export const theme = {
  dark: createTheme('dark', baseColors),
  light: createTheme('light', baseColors),
};
