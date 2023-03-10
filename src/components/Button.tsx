import { Pressable, PressableProps, Text } from 'react-native';
import { colors } from '../theme';

export const Button = ({ title, onPress, disabled, style }: PressableProps & { title: string }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1, style }]}
      pressRetentionOffset={20}
      hitSlop={20}
      testID="button"
    >
      <Text style={{ fontSize: 17, color: disabled ? colors.mainGrey : colors.mainBlue }}>
        {title}
      </Text>
    </Pressable>
  );
};
