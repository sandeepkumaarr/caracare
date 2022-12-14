import {Dimensions} from 'react-native';

import {createTheme} from '@shopify/restyle';
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from 'react-native-size-matters';

const palette = {
  grayishBlue: '#D8DDE9',
  grayishOrange: '#FCEECA',
  grayishPink: '#F9CEDE',
  softBlue: '#8DBBF0',
  paleBlue: '#FDFDFF',
  grayishOrangeOpacity: 'rgba(253, 253, 255, 0.6)',
  lightRed: '#fc4c4c',

  black: '#0B0B0B',
  halfBlack: 'rgba(0, 0, 0, 0.3)',
  white: '#F0F2F3',
};
const windowWidth = Dimensions.get('window').width;

const theme = createTheme({
  colors: {
    primary: palette.paleBlue,
    secondary: palette.softBlue,
    bottomtabBackground: palette.grayishBlue,
    buttonText: palette.black,
    favourite: palette.lightRed,
    cardBackground: palette.grayishOrangeOpacity,
    favouriteBackground: palette.halfBlack,
    episodeBackground: palette.grayishOrange,
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
    default: {},
  },
  textVariants: {
    default: {},
    buttonText: {
      fontSize: moderateScale(16),
      color: 'buttonText',
      fontWeight: '700',
      fontFamily: 'SFProText-Regular',
      textAlign: 'center',
    },
    dropDownText: {
      flexWrap: 'wrap',
      fontSize: moderateScale(14),
      color: 'buttonText',
      fontWeight: '500',
      fontFamily: 'SFProText-Regular',
    },
    defaultBody: {
      fontSize: moderateScale(14),
      color: 'buttonText',
      fontWeight: '400',
      fontFamily: 'SFProText-Regular',
    },
    charaterDetailHeader: {
      fontSize: moderateScale(30),
      color: 'bottomtabBackground',
      fontWeight: '700',
      fontFamily: 'SFProText-Bold',
      textAlign: 'center',
    },
    characterDetailBody: {
      fontSize: moderateScale(18),
      color: 'bottomtabBackground',
      fontWeight: '600',
      fontFamily: 'SFProText-Regular',
    },

    episodeHeader: {
      fontSize: moderateScale(18),
      color: 'buttonText',
      fontWeight: '700',
      fontFamily: 'SFProText-Bold',
      textAlign: 'center',
    },
  },
  bottomTabVariants: {
    defaults: {
      backgroundColor: 'bottomtabBackground',
      paddingVertical: 3,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    default: {},
  },
  searchBarVariants: {
    defaults: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: windowWidth,
    },
    default: {},
  },

  dropDownVariants: {
    defaults: {},
    default: {},
  },

  toggleItemVariants: {
    defaults: {},
    default: {},
  },

  cardVariants: {
    defaults: {},
    default: {},
    CharacterCard: {
      backgroundColor: 'cardBackground',
      padding: 3,
      borderColor: 'buttonText',
      borderWidth: 1.5,
      borderRadius: Math.round(moderateVerticalScale(30)),
    },
    characterDetailCard: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: Math.round(moderateVerticalScale(250)),
      padding: 10,
      backgroundColor: 'favouriteBackground',
    },
    episodeCard: {
      backgroundColor: 'episodeBackground',
      padding: 3,
      borderColor: 'buttonText',
      borderWidth: 1.5,
      borderRadius: Math.round(moderateVerticalScale(15)),
      width: windowWidth / 2.3,
    },
  },
});

export type Theme = typeof theme;
export default theme;
