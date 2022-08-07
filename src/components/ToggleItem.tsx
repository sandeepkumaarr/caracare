import {StyleSheet} from 'react-native';
import React from 'react';
import {
  AllProps,
  backgroundColor,
  createRestyleComponent,
  createVariant,
  VariantProps,
  useRestyle,
} from '@shopify/restyle';

import {Theme} from '../themes/default';
import Box from './Box';

const toggleItemVariant = createVariant({themeKey: 'toggleItemVariants'});
const ToggleItemContainer = createRestyleComponent<
  VariantProps<Theme, 'toggleItemVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([toggleItemVariant], Box);

const restyleFunctions = [toggleItemVariant as any, backgroundColor];

type ToggleItemProps = AllProps<Theme> &
  VariantProps<Theme, 'toggleItemVariants'> & {
    toggleComponent: React.ReactNode;
    toggledComponent: React.ReactNode;
    toggle: boolean;
  };
const ToggleItem = ({...rest}: ToggleItemProps) => {
  const props = useRestyle([restyleFunctions], rest);

  const {toggle, toggleComponent, toggledComponent} = rest;

  return (
    <ToggleItemContainer {...props}>
      {toggle ? toggledComponent : toggleComponent}
    </ToggleItemContainer>
  );
};

export default ToggleItem;
