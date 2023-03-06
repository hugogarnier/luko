import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { Button } from './Button';

describe('AddItemScreen', () => {
  it('Render', () => {
    const { getByTestId } = render(<Button title="test" />);
    const button = getByTestId('button');

    expect(button).toBeTruthy();
  });

  it('onPress', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(<Button title="test" onPress={mockOnPress} />);

    const button = getByTestId('button');
    fireEvent(button, 'onPress');
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
