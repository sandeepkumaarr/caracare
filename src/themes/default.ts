import {createTheme} from '@shopify/restyle';
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from 'react-native-size-matters';

const palette = {
  cyanBlue: '#186eb7',
  cyanMedium: '#4A97CA',
  cyanLight: 'rgba(24,110,183,0.5)',
  WhiteSmoke: '#e5e5e5',
  grey: '#303030',
  limegreen: '#9deec4',
  meatBrown: 'rgba(232, 168, 69,0.5)',

  black: '#0B0B0B',
  white: '#F0F2F3',
};

const theme = createTheme({
  colors: {
    primary: palette.cyanBlue,
    secondary: palette.limegreen,
    buttonText: palette.white,
    buttonText_off: palette.black,
    headerText: palette.black,
    authBackground: palette.WhiteSmoke,
    buttonBackground: palette.grey,
    bottomTabHighlight: palette.cyanLight,
    bottomTabBackground: palette.cyanMedium,
  },
  spacing: {
    nil: 0,
    0: moderateScale(2, 0.5),
    1: moderateScale(4, 0.5),
    2: moderateScale(6, 0.5),
    3: moderateScale(8, 0.5),
    4: moderateScale(10, 0.5),
    5: moderateScale(12, 0.5),
    6: moderateScale(14, 0.5),
    7: moderateScale(16, 0.5),
    8: moderateScale(18, 0.5),
    9: moderateScale(20, 0.5),
    10: moderateScale(22, 0.5),
    11: moderateScale(24, 0.5),
    12: moderateScale(26, 0.5),
    13: moderateScale(28, 0.5),
    14: moderateScale(30, 0.5),
    15: moderateScale(32, 0.5),
    16: moderateScale(34, 0.5),
    17: moderateScale(36, 0.5),
    18: moderateScale(38, 0.5),
    19: moderateScale(40, 0.5),
    20: moderateScale(42, 0.5),
    xl: moderateScale(64, 0.5),
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },

  buttonVariants: {
    defaults: {},
  },
  textVariants: {
    default: {},
  },
});

export type Theme = typeof theme;
export default theme;
