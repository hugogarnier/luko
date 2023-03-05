import { FC, useState } from 'react';
import { TextInput, View, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { colors } from '../theme';
import { Text } from './Text';

type Input = {
  label: string;
  onChangeValue: (text: string) => void;
  value: string;
  placeholder: string;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  rightText?: string;
  error?: string;
};
export const Input: FC<Input> = ({
  label,
  onChangeValue,
  value,
  placeholder,
  multiline,
  keyboardType,
  rightText,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text variant={'input'} style={styles.label}>
        {label}
      </Text>
      <View>
        <TextInput
          style={[
            styles.input,
            {
              height: (multiline && 150) || 50,
              borderColor: (isFocused && colors.mainBlue) || colors.mainGrey,
              shadowColor: (isFocused && colors.mainBlue) || '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: (isFocused && 0.25) || 0,
              shadowRadius: (isFocused && 3.84) || 0,

              elevation: (isFocused && 5) || 0,
            },
          ]}
          onChangeText={onChangeValue}
          value={value}
          placeholder={placeholder}
          multiline={multiline}
          autoCapitalize={'none'}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {rightText && (
          <Text variant={'input'} style={styles.rightText}>
            {rightText}
          </Text>
        )}
        {error && (
          <Text variant={'error'} style={styles.error}>
            {error}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  label: { marginBottom: 5 },
  input: {
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  rightText: { position: 'absolute', top: 10, right: 20 },
  error: { marginLeft: 10 },
});
