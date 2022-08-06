import React from 'react';
import Home from '../assets/images/svg/home.svg';
import Favourite from '../assets/images/svg/favourite.svg';
import FavouriteON from '../assets/images/svg/favourite-on.svg';
import FavouriteOFF from '../assets/images/svg/favourite-off.svg';
import Search from '../assets/images/svg/search.svg';
import Cancel from '../assets/images/svg/cancel.svg';
import List from '../assets/images/svg/list.svg';
import Grid from '../assets/images/svg/grid.svg';
import Dot_Green from '../assets/images/svg/dot_green.svg';
import Dot_Red from '../assets/images/svg/dot_red.svg';
import Dot_Unknown from '../assets/images/svg/dot_unknown.svg';

export declare type SVGTypes =
  | 'home'
  | 'favourite'
  | 'favourite-on'
  | 'favourite-off'
  | 'search'
  | 'cancel'
  | 'list'
  | 'grid'
  | 'dot_green'
  | 'dot_red'
  | 'dot_unknown';

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
    case 'home':
      Component = Home;
      break;

    case 'favourite':
      Component = Favourite;
      break;

    case 'favourite-on':
      Component = FavouriteON;
      break;

    case 'favourite-off':
      Component = FavouriteOFF;
      break;

    case 'search':
      Component = Search;
      break;

    case 'cancel':
      Component = Cancel;
      break;

    case 'list':
      Component = List;
      break;

    case 'grid':
      Component = Grid;
      break;

    case 'dot_green':
      Component = Dot_Green;
      break;

    case 'dot_red':
      Component = Dot_Red;
      break;

    case 'dot_unknown':
      Component = Dot_Unknown;
      break;
  }

  return <Component {...props} />;
};
