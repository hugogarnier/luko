import { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import uuid from 'react-native-uuid';

import { AddImage, Button, Input, Modal, Rule } from '../../components';
import { InventoryItems } from '../../customTypes';
import { RootTabScreenProps } from '../../navigation/types';
import { colors } from '../../theme';
import { getAsyncStorageItem, ImagePicker, setAsyncStorageItem } from '../../sdk';
import { compareTotalValue } from '../../services';

type Values = Omit<InventoryItems[number], 'description'> & {
  description: string;
  errorName?: string;
  errorValue?: string;
  errorImageUri?: string;
};
export const AddItemScreen = ({ navigation }: RootTabScreenProps<'AddItemScreen'>) => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItems>([]);
  const [values, setValues] = useState<Values>({
    id: '',
    name: '',
    value: '',
    description: '',
    imageUri: '',
    errorName: '',
    errorValue: '',
    errorImageUri: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      (async () => {
        setInventoryItems(await getAsyncStorageItem('inventory'));
      })();
    }
  }, [isFocused]);

  const handleAdd = async () => {
    const isTotalValueOverLimit = compareTotalValue(values.value, inventoryItems);

    if (!values.name) {
      return setValues({ ...values, errorName: 'name is mandatory' });
    }
    if (!values.value) {
      return setValues({ ...values, errorValue: 'value is mandatory' });
    }
    if (!isTotalValueOverLimit) {
      return setValues({
        ...values,
        errorValue: 'total of values cannot be greater than €40000',
      });
    }
    if (!values.imageUri) {
      return setValues({ ...values, errorImageUri: 'image is mandatory' });
    }

    await setAsyncStorageItem(
      'inventory',
      JSON.stringify(
        (inventoryItems && [...inventoryItems, { ...values, id: uuid.v4() }]) || [
          { ...values, id: uuid.v4() },
        ],
      ),
    );
    return navigation.goBack();
  };

  const handleImagePickerCamera = async () => {
    const photo = await ImagePicker.takePhoto();
    if (photo && photo.assets) {
      setValues({ ...values, imageUri: photo.assets[0].uri });
    }
    setModalVisible(false);
  };

  const handleImagePickerGallery = async () => {
    const image = await ImagePicker.pickImage();
    if (image && image.assets) {
      setValues({ ...values, imageUri: image.assets[0].uri });
    }
    setModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      testID="addItemScreen"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={styles.buttonsContainer}>
            <Button title="Cancel" onPress={() => navigation.goBack()} />
            <Button title="Add" onPress={handleAdd} testID="addButton" />
          </View>
          <View style={styles.formContainer}>
            <AddImage
              imageUri={values.imageUri}
              errorImageUri={values.errorImageUri}
              setModalVisible={setModalVisible}
            />
            <View style={{ flex: 1, width: '100%' }}>
              <Input
                label={'Name'}
                onChangeValue={(text) => setValues({ ...values, name: text, errorName: '' })}
                value={values.name}
                placeholder={'Bracelet'}
                error={values.errorName}
              />
              <Input
                label={'Value'}
                onChangeValue={(text) => setValues({ ...values, value: text, errorValue: '' })}
                value={values.value}
                placeholder={'700'}
                keyboardType={'numeric'}
                rightText="€"
                error={values.errorValue}
              />
              <Input
                label={'Description'}
                onChangeValue={(text) => setValues({ ...values, description: text })}
                value={values.description}
                placeholder={'optional'}
                multiline
              />
            </View>
          </View>
          <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
            <>
              <Button title="Camera" onPress={handleImagePickerCamera} />
              <Rule />
              <Button title="Gallery" onPress={handleImagePickerGallery} />
              <Rule />
              <Button title="Cancel" onPress={() => setModalVisible(!modalVisible)} />
            </>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
    paddingTop: 50,
  },
  buttonsContainer: {
    width: '100%',
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
});
