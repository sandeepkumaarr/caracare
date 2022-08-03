import React from 'react';

export declare type SVGTypes = '';

type SVGprops = {
  type: SVGTypes;
  height: string;
  width: string;
  style?: object;
};

export const SVGIcon: React.FC<SVGprops> = ({type, height, width, style}) => {
  let Component: any;
  let props = {
    height: height,
    width: width,
    style: style,
  };

  switch (type) {
  }

  return <Component {...props} />;
};
