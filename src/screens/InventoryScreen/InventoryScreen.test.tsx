import React from 'react';
import { render } from '@testing-library/react-native';

import { InventoryScreen } from './InventoryScreen';
import MockNavigator from '../../../jest/setup/mockNavigator';

describe('InventoryScreen', () => {
  it('Render', () => {
    const { getByTestId, unmount } = render(<MockNavigator component={InventoryScreen} />);

    const inventoryScreen = getByTestId('inventoryScreen');

    expect(inventoryScreen).toBeTruthy();
    unmount();
  });

  it('Components', () => {
    const { getByTestId, unmount } = render(<MockNavigator component={InventoryScreen} />);

    const inventoryScreen = getByTestId('inventoryScreen');
    const flatList = getByTestId('flatList');
    const title = getByTestId('title');

    expect(inventoryScreen).toBeTruthy();
    expect(flatList).toBeTruthy();
    expect(title).toBeTruthy();

    unmount();
  });
});
