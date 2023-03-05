import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { InventoryCard, Title } from '../components';
import { InventoryItems } from '../customTypes';
import { RootTabScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { getAsyncStorageItem } from '../sdk';

export default function InventoryScreen({ navigation, route }: RootTabScreenProps<'Inventory'>) {
  const [items, setItems] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        setItems(await getAsyncStorageItem('inventory'));
      })();
    }
  }, [isFocused]);
  const handleAddButtonPress = () => navigation.navigate('AddItem');

  const renderItem = ({ item, index }: { item: InventoryItems[number]; index: number }) => {
    return (
      <InventoryCard imageUri={item.imageUri} name={item.name} value={item.value} index={index} />
    );
  };

  return (
    <View style={styles.container}>
      <Title onButtonPress={handleAddButtonPress}>{route.name}</Title>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
});
