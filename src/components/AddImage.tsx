import { FC } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { colors } from '../theme';
import { Text } from './Text';

type AddImageProps = {
  imageUri: string;
  errorImageUri: string;
  setModalVisible: (arg: boolean) => void;
};
export const AddImage: FC<AddImageProps> = ({ imageUri, errorImageUri, setModalVisible }) => {
  return (
    <Pressable onPress={() => setModalVisible(true)}>
      <View style={styles.imageContainer}>
        {(imageUri && (
          <Image
            source={{
              uri: imageUri,
            }}
            style={styles.image}
            resizeMode="cover"
          />
        )) || (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <MaterialIcons name="add-a-photo" size={32} color={colors.mainBlue} />
            <Text variant={'primary'} style={{ marginTop: 10 }}>
              Add photo
            </Text>
          </View>
        )}
      </View>
      {errorImageUri && (
        <Text variant={'error'} style={{ textAlign: 'center' }}>
          {errorImageUri}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: colors.mainGrey,
    borderRadius: 75,
  },
  image: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: colors.mainGrey,
    borderRadius: 75,
  },
});
