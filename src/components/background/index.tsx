import React, { ReactNode } from 'react';
import {style} from './styles';
import {LinearGradient} from 'expo-linear-gradient';
import { theme } from '../../global/styles/theme';

type Props = {
    children: ReactNode,
};

export function Background({children}: Props) {
    const { secondary80, secondary100 } = theme.colors;
  return (
      <LinearGradient style={style.container} colors={[secondary80, secondary100]}>
          {children}
      </LinearGradient>
  );
}