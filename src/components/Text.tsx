import { FC, ReactNode } from 'react';
import { Text as TextRN, TextStyle } from 'react-native';

import { colors, fonts } from '../theme';

type TextProps = {
  children: ReactNode;
  variant: 'primary' | 'secondary' | 'error' | 'input';
  style?: TextStyle;
};
export const Text: FC<TextProps> = ({ children, variant, style }) => {
  return (
    <TextRN
      style={{
        fontFamily: fonts.regular,
        textAlign: 'left',
        color:
          (variant === 'primary' && 'black') ||
          (variant === 'secondary' && colors.mainGrey) ||
          (variant === 'error' && 'red') ||
          'black',
        fontSize: (variant === 'primary' && 19) || 15,
        lineHeight: (variant === 'primary' && 26) || (variant === 'secondary' && 20) || 26,
        ...style,
      }}
      numberOfLines={(variant === 'primary' && 1) || 0}
    >
      {children}
    </TextRN>
  );
};
