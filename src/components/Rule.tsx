import { FC } from 'react';
import { View } from 'react-native';
import { colors } from '../theme';

export const Rule: FC = () => {
  return (
    <View
      style={{
        marginVertical: 10,
        borderBottomWidth: 1,
        borderColor: colors.mainGrey,
        width: '100%',
      }}
    ></View>
  );
};
