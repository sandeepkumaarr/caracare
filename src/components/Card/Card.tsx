import React from 'react';
import {
  AllProps,
  backgroundColor,
  createRestyleComponent,
  createVariant,
  VariantProps,
  useRestyle,
} from '@shopify/restyle';
import {Theme} from '../../themes/default';
import Box from '../Box';

const cardVariant = createVariant({themeKey: 'cardVariants'});
const CardContainer = createRestyleComponent<
  VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([cardVariant], Box);

const restyleFunctions = [cardVariant as any, backgroundColor];

type CardProps = AllProps<Theme> &
  VariantProps<Theme, 'cardVariants'> & {
    children: React.ReactNode;
  };
const Card = ({...rest}: CardProps) => {
  const props = useRestyle([restyleFunctions], rest);

  return <CardContainer {...props} />;
};

export default Card;
