import { FC } from 'react';
import { TextInput, Text, View, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { colors } from '../theme/colors';

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
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeValue}
          value={value}
          placeholder={placeholder}
          multiline={multiline}
          autoCapitalize={'none'}
          keyboardType={keyboardType}
        />
        {rightText && <Text style={styles.rightText}>{rightText}</Text>}
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {},
  input: {},
  rightText: {},
  error: {},
});
