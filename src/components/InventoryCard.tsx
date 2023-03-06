import { FC } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native';

import { InventoryItems } from '../customTypes';
import { Text } from './Text';

const { width } = Dimensions.get('window');

const ITEM_WIDTH = width * 0.5;
const ITEM_HEIGHT = 250;
const BORDER_RADIUS = 20;

type InventoryCard = Pick<InventoryItems[number], 'name' | 'value' | 'imageUri'> & {
  index: number;
};
export const InventoryCard: FC<InventoryCard> = ({ name, value, imageUri, index }) => {
  return (
    <Pressable
      style={{
        flex: 1,
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        marginRight: index % 2 !== 0 ? 0 : 20,
      }}
      testID={'inventoryCard'}
    >
      <View style={styles.itemContent}>
        <Image
          source={{
            uri:
              (imageUri && imageUri) ||
              'https://i.ibb.co/znXC7LQ/marcus-lewis-U63z-XX2f7ho-unsplash.jpg',
          }}
          style={styles.itemImage}
        />
        <View
          style={{
            flex: 1,
            marginVertical: 12,
            marginHorizontal: 20,
            justifyContent: 'space-between',
          }}
        >
          <Text variant={'primary'}>{name}</Text>
          <Text variant={'secondary'}>€{value}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContent: {
    flex: 1,
    width: ITEM_WIDTH * 0.85,
    height: '100%',
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    width: '100%',
    height: ITEM_WIDTH - 30,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    resizeMode: 'cover',
  },
});
