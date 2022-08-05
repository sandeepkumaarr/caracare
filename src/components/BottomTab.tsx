import React from 'react';
import {
  AllProps,
  backgroundColor,
  createRestyleComponent,
  createVariant,
  useRestyle,
  VariantProps,
} from '@shopify/restyle';
import Box from './Box';
import {Theme} from '../themes/default';

const bottomTabVariant = createVariant({themeKey: 'bottomTabVariants'});
const BottomTabContainer = createRestyleComponent<
  VariantProps<Theme, 'bottomTabVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([bottomTabVariant], Box);

const restyleFunctions = [bottomTabVariant as any, backgroundColor];

type BottomTabProps = AllProps<Theme> &
  VariantProps<Theme, 'bottomTabVariants'> & {
    children: React.ReactNode;
  };

const BottomTab = ({children, ...rest}: BottomTabProps) => {
  const props = useRestyle([restyleFunctions], rest);

  return <BottomTabContainer {...props}>{children}</BottomTabContainer>;
};

export default BottomTab;
