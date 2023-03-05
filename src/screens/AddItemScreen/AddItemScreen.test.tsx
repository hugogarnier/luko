import React from 'react';
import { render } from '@testing-library/react-native';

import { AddItemScreen } from './AddItemScreen';
import MockNavigator from '../../../jest/setup/mockNavigator';

describe('AddItemScreen', () => {
  it('Render', () => {
    const { getByTestId } = render(<MockNavigator component={AddItemScreen} />);

    const addItemScreen = getByTestId('addItemScreen');

    expect(addItemScreen).toBeTruthy();
  });

  it('Components', () => {
    const { getByTestId, queryAllByTestId } = render(<MockNavigator component={AddItemScreen} />);

    const addItemScreen = getByTestId('addItemScreen');
    const addImage = getByTestId('addImage');
    const modal = getByTestId('modal');
    const buttons = queryAllByTestId('button');
    const inputs = queryAllByTestId('input');

    expect(addItemScreen).toBeTruthy();
    expect(addImage).toBeTruthy();
    expect(modal).toBeTruthy();
    expect(buttons.length).toEqual(2);
    expect(inputs.length).toEqual(3);
  });
});
