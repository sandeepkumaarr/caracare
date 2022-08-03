import React from 'react';
import {View} from 'react-native';
import style from './style';

type centerViewProps = {
  children: null | React.ReactNode;
};

const CenterView = ({children}: centerViewProps) => {
  return <View style={style.main}>{children}</View>;
};

export default CenterView;
