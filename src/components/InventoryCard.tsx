import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { fonts } from '../theme/fonts';
import { InventoryItems } from '../customTypes';
import { FC } from 'react';

const { width } = Dimensions.get('window');

const ITEM_WIDTH = width * 0.5;
const ITEM_HEIGHT = 250;
const BORDER_RADIUS = 20;

type InventoryCard = Pick<InventoryItems[number], 'name' | 'purchasePrice' | 'photo'> & {
  index: number;
};
export const InventoryCard: FC<InventoryCard> = ({ name, purchasePrice, photo, index }) => {
  return (
    <Pressable
      style={{
        flex: 1,
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        marginRight: index % 2 !== 0 ? 0 : 20,
      }}
    >
      <View style={styles.itemContent}>
        <Image source={{ uri: photo }} style={styles.itemImage} />
        <View>
          <Text style={styles.itemText}>{name}</Text>
          <Text style={styles.itemText}>{purchasePrice}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContent: {
    height: '100%',
    // alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS,
  },
  itemText: {
    fontSize: 24,
    color: 'black',
    fontWeight: '600',
  },
  itemImage: {
    width: '100%',
    height: ITEM_WIDTH - 20,
    borderTopStartRadius: BORDER_RADIUS,
    borderTopEndRadius: BORDER_RADIUS,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    resizeMode: 'cover',
  },
});
