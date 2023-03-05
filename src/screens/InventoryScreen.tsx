import { FlatList, StyleSheet, Text, View } from 'react-native';

import { InventoryItems } from '../customTypes';
import { RootTabScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { valuables } from '../../jest/data';
import { InventoryCard, Title } from '../components';

export default function InventoryScreen({ navigation, route }: RootTabScreenProps<'Inventory'>) {
  const handleAddButtonPress = () => navigation.navigate('AddItem');

  const renderItem = ({ item, index }: { item: InventoryItems[number]; index: number }) => {
    return (
      <InventoryCard
        key={item.id}
        photo={item.photo}
        name={item.name}
        purchasePrice={item.purchasePrice}
        index={index}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Title onButtonPress={handleAddButtonPress}>{route.name}</Title>
      <FlatList
        data={valuables}
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
