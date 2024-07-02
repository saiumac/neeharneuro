// theme.ts
import { createTheme } from '@mui/material/styles';
import { DownChevronIcon } from './icons/CommonIcons';

const fonts = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
];

const FontFamily = ['Manrope', ...fonts].join(',');

const fontWeightStyles = {
  regular: {
    fontWeight: 400,
  },
  medium: {
    fontWeight: 500,
  },
  semiBold: {
    fontWeight: 600,
  },
  bold: {
    fontWeight: 700,
  },
};

const fontStyles = {
  b20: {
    ...fontWeightStyles.bold,
    fontSize: '20px',
    lineHeight: '30px',
  },
  b18: {
    ...fontWeightStyles.bold,
    fontSize: '18px',
    lineHeight: '28px',
  },
  b16: {
    ...fontWeightStyles.bold,
    fontSize: '16px',
    lineHeight: '26px',
  },
  b14: {
    ...fontWeightStyles.bold,
    fontSize: '14px',
    lineHeight: '20px',
  },
  b12: {
    ...fontWeightStyles.bold,
    fontSize: '12px',
    lineHeight: '18px',
  },

  sb30: {
    ...fontWeightStyles.semiBold,
    fontSize: '30px',
    lineHeight: '40px',
  },
  sb24: {
    ...fontWeightStyles.semiBold,
    fontSize: '24px',
    lineHeight: '24px',
  },
  sb20: {
    ...fontWeightStyles.semiBold,
    fontSize: '20px',
    lineHeight: '26px',
  },
  sb18: {
    ...fontWeightStyles.semiBold,
    fontSize: '18px',
    lineHeight: '24px',
  },
  sb16: {
    ...fontWeightStyles.semiBold,
    fontSize: '16px',
    lineHeight: '21px',
  },
  sb14: {
    ...fontWeightStyles.semiBold,
    fontSize: '14px',
    lineHeight: '24px',
  },
  sb12: {
    ...fontWeightStyles.semiBold,
    fontSize: '12px',
    lineHeight: '16px',
  },

  m24: {
    ...fontWeightStyles.medium,
    fontSize: '24px',
    lineHeight: '30px',
  },
  m18: {
    ...fontWeightStyles.medium,
    fontSize: '18px',
    lineHeight: '24px',
  },
  m16: {
    ...fontWeightStyles.medium,
    fontSize: '16px',
    lineHeight: '21px',
  },
  m14: {
    ...fontWeightStyles.medium,
    fontSize: '14px',
    lineHeight: '24px',
  },
  m13: {
    ...fontWeightStyles.medium,
    fontSize: '13px',
    lineHeight: '17px',
  },
  m12: {
    ...fontWeightStyles.medium,
    fontSize: '12px',
    lineHeight: '16px',
  },
  m10: {
    ...fontWeightStyles.medium,
    fontSize: '10px',
    lineHeight: '18px',
  },
  r50: {
    ...fontWeightStyles.regular,
    fontSize: '50px',
    lineHeight: 'normal',
  },
  r32: {
    ...fontWeightStyles.regular,
    fontSize: '32px',
    lineHeight: 'normal',
  },
  r24: {
    ...fontWeightStyles.regular,
    fontSize: '24px',
    lineHeight: '30px',
  },
  r20: {
    ...fontWeightStyles.regular,
    fontSize: '20px',
    lineHeight: 'normal',
  },
  r18: {
    ...fontWeightStyles.regular,
    fontSize: '18px',
    lineHeight: '24px',
  },
  r16: {
    ...fontWeightStyles.regular,
    fontSize: '16px',
    lineHeight: '21px',
  },
  r14: {
    ...fontWeightStyles.regular,
    fontSize: '14px',
    lineHeight: '22px',
  },
  r12: {
    ...fontWeightStyles.regular,
    fontSize: '12px',
    lineHeight: '16px',
  },

  r10: {
    ...fontWeightStyles.regular,
    fontSize: '10px',
    lineHeight: '14px',
  },
};
export const colors = {
  appPrimary: '#4159E9',
  error: '#EA4D4D',
  errorLight: '#FFF0F0',
  blue: '#4142CF',
  green: '#00963F',
  greenLight: '#ECFDF3',
  yellow: '#EC7E27',
  grey1: '#C5CCDA',
  grey2: '#A4ADCE',
  grey3: '#464F60',
  grey4: '#181619',
};

const baseTheme = createTheme({
  spacing: (num: number) => num * 5,
  palette: {
    text: {
      primary: colors.grey4,
      secondary: colors.grey3,
    },
    primary: {
      main: colors.appPrimary,
    },
    secondary: {
      main: colors.grey3,
    },
    warning: {
      main: colors.yellow,
    },
    error: {
      main: colors.error,
      light: colors.errorLight,
    },
    success: {
      main: colors.green,
      light: colors.greenLight,
    },
    action: {
      active: colors.appPrimary,
    },
    grey: {
      100: colors.grey1,
      300: colors.grey2,
      500: colors.grey3,
      900: colors.grey4,
    },
  },
  typography: {
    ...fontStyles,
    fontFamily: FontFamily,
    h1: {
      ...fontStyles.b20,
    },
    h2: {
      ...fontStyles.b18,
    },
    h3: {
      ...fontStyles.b16,
    },
    h4: {
      ...fontStyles.m18,
    },
    h5: {
      ...fontStyles.b16,
    },
    h6: {
      ...fontStyles.b14,
    },
    subtitle1: {
      ...fontStyles.sb16,
    },
    subtitle2: {
      ...fontStyles.sb14,
    },
    body1: {
      ...fontStyles.r14,
    },
    body2: {
      ...fontStyles.r12,
    },
    caption: {
      fontSize: '10px',
    },
  },
});
const theme = createTheme(baseTheme, {
  typography: {
    // h1: {
    //   [baseTheme.breakpoints.up(baseTheme.breakpoints.values.md)]: {
    //     ...fontStyles.b20,
    //   },
    // },
    // h2: {
    //   [baseTheme.breakpoints.up(baseTheme.breakpoints.values.md)]: {
    //     ...fontStyles.b16,
    //   },
    // },
    // h3: {
    //   [baseTheme.breakpoints.up(baseTheme.breakpoints.values.md)]: {
    //     ...fontStyles.b16,
    //   },
    // },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          ...fontStyles.r14,
          color: baseTheme.palette.common.black,
          height: '100%',
          minHeight: 'fit-content',
          width: '100%',
          backgroundColor: '#F7F8FC',
          WebkitTextSizeAdjust: '100%',
          MozTextSizeAdjust: '100%',
          textSizeAdjust: 'none',
        },
        '#root': {
          boxSizing: 'border-box',
          position: 'relative',
          backgroundColor: '#F7F8FC',
        },
        html: {
          height: '100%',
          [baseTheme.breakpoints.up(baseTheme.breakpoints.values.xxl)]: {
            minWidth: 'min(100%, 1920px)',
          },
          scrollBehavior: 'smooth',
        },
        a: {
          textDecoration: 'none',
          color: 'inherit',
          '&:hover': {
            color: 'inherit',
          },
          '&:visited': {
            color: 'inherit',
          },
        },
        'input[type=number]::-webkit-inner-spin-button, &input[type=number]::-webkit-outer-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
        'input[type=number]': {
          MozAppearance: 'textfield',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'initial',
          padding: '8px 15px',
          minWidth: '100px',
          ...fontStyles.sb14,
          borderRadius: '8px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        outlinedSecondary: {
          border: `1px solid ${baseTheme.palette.grey[900]}`,
          color: baseTheme.palette.grey[900],
          background: '#ffffff',
          '&:hover': {
            border: `1px solid ${baseTheme.palette.grey[900]}`,
            background: '#ffffff',
          },
        },
        outlinedPrimary: {
          background: '#ffffff',
          border: `1px solid ${baseTheme.palette.primary.main}`,
          '&:hover': {
            background: '#ffffff',
          },
        },
        text: {
          padding: 0,
          minWidth: 'auto',
          ...fontStyles.m14,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '15px 0 15px 20px',
          '&.Mui-selected': {
            backgroundColor: 'transparent',
          },
          '&:first-of-type':{
            paddingLeft: '10px',
          },
        },
        head: {
          padding: '10px 0 10px 20px',
          background: '#F7F8FC',
          color: '#8699BD',
          ...fontStyles.b14,
          textTransform: 'uppercase',
          border: "0",
          '&:first-of-type':{
            borderRadius: '8px 0 0 8px',
          },
          '&:last-child':{
            borderRadius: '0 8px 8px 0',
          }
        },
        body: {
          ...fontStyles.m14,
          color: baseTheme.palette.grey[500],
          borderColor: '#E4E9FF',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          ...fontStyles.m14,
          color: baseTheme.palette.grey[900],
          borderColor: baseTheme.palette.grey[900],
          '&.Mui-selected': {
            background: baseTheme.palette.primary.main,
            color: baseTheme.palette.common.white,
            '&:hover': {
              background: baseTheme.palette.primary.main,
              color: baseTheme.palette.common.white,
            },
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          '& .MuiTablePagination-spacer': {
            display: 'none',
          },
          '& .MuiToolbar-root': {
            padding: '15px 20px',
          },
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
            ...fontStyles.m14,
            color: baseTheme.palette.grey[900],
            margin: 0,
          },
          '& .MuiTablePagination-input': {
            padding: 0,
            margin: '0 10px',
            border: `1px solid ${baseTheme.palette.grey[900]}`,
            borderRadius: '5px',
            '& > .MuiSelect-select': {
              padding: '5px 37px 5px 15px !important',
              ...fontStyles.m14,
              lineHeight: '21px',
              color: baseTheme.palette.grey[900],
            },
            '& .MuiSelect-icon': {
              right: '5px',
            },
            '& .MuiSvgIcon-root': {
              marginRight: '8px',
              color: baseTheme.palette.grey[900],
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: baseTheme.palette.common.white,
          '& fieldset': {
            borderColor: baseTheme.palette.grey[300],
            borderRadius: '8px',
          },
          '&:hover fieldset': {
            borderColor: baseTheme.palette.grey[300],
          },
          '&.Mui-focused fieldset': {
            borderColor: baseTheme.palette.grey[300],
          },
        },
        input:{
            padding: 0,
        },
        notchedOutline: {
          borderColor: baseTheme.palette.grey[300],
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        IconComponent: DownChevronIcon,
      },
    },
    MuiInputBase:{
      styleOverrides: {
        root:{
          padding:'10px',
        },
        sizeSmall:{
          padding:'10px !important',
          '& .MuiAutocomplete-input':{
            padding:'0 !important',
          }
        }
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root:{
          color: baseTheme.palette.text.primary,
          ...baseTheme.typography.m14,
        },
        asterisk: {
          color: baseTheme.palette.error.main,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          minHeight: 'auto',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginBottom: '-1.5px',
        },
      },
    },
    
    MuiTab: {
      styleOverrides: {
        root: {
          ...baseTheme.typography.sb14,
          textTransform: 'capitalize',
        },
      },
    },
    
    MuiTypography: {
      fontFamily: 'Manrope',
    },
  },
  breakpoints: {
    values: {
      xs: 360,
      s: 400,
      sm: 600,
      m: 960,
      md: 1024,
      l: 1100,
      lg: 1248,
      xl: 1440,
      xxl: 1920,
    },
  },
});
export default theme;
