import {TouchableOpacity} from 'react-native';
import React from 'react';
import {
  AllProps,
  backgroundColor,
  createRestyleComponent,
  createVariant,
  VariantProps,
  useRestyle,
} from '@shopify/restyle';
import * as Animatable from 'react-native-animatable';
import {moderateScale} from 'react-native-size-matters';

import {Theme} from '../themes/default';
import Box from './Box';
import Text from './Text';

const dropDownVariant = createVariant({themeKey: 'dropDownVariants'});
const BottomTabContainer = createRestyleComponent<
  VariantProps<Theme, 'dropDownVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([dropDownVariant], Box);

const restyleFunctions = [dropDownVariant as any, backgroundColor];

type DropDownProps = AllProps<Theme> &
  VariantProps<Theme, 'dropDownVariants'> & {
    children: React.ReactNode;
    showDropdown: boolean;
    setshowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  };

const Dropdown = ({
  children,
  showDropdown,
  setshowDropdown,
  ...rest
}: DropDownProps) => {
  const props = useRestyle([restyleFunctions], rest);

  return (
    <BottomTabContainer {...props}>
      <TouchableOpacity
        onPress={() => setshowDropdown(prev => !prev)}
        style={{
          backgroundColor: '#FCEECA',
          padding: Math.round(moderateScale(5)),
          borderRadius: Math.round(moderateScale(10)),
        }}>
        <Text variant={'buttonText'}>Filter</Text>
      </TouchableOpacity>
      {showDropdown ? (
        <Animatable.View animation={showDropdown ? 'fadeIn' : 'fadeOut'}>
          <Box
            position={'absolute'}
            top={Math.round(moderateScale(5))}
            backgroundColor={'bottomtabBackground'}
            zIndex={100}
            width={'100%'}
            borderBottomLeftRadius={Math.round(moderateScale(10))}
            borderBottomRightRadius={Math.round(moderateScale(10))}
            borderTopLeftRadius={Math.round(moderateScale(5))}
            borderTopRightRadius={Math.round(moderateScale(5))}>
            {children}
          </Box>
        </Animatable.View>
      ) : null}
    </BottomTabContainer>
  );
};

export default Dropdown;
