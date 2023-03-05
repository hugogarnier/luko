import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import uuid from 'react-native-uuid';

import { AddImage, Button, Input, Modal, Rule } from '../components';
import { RootTabScreenProps } from '../navigation/types';
import { colors } from '../theme';
import { getAsyncStorageItem, ImagePicker, setAsyncStorageItem } from '../sdk';

export default function AddItemScreen({ navigation }: RootTabScreenProps<'AddItemScreen'>) {
  const [values, setValues] = useState({
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
  const handleAdd = async () => {
    if (!values.name) {
      return setValues({ ...values, errorName: 'name is mandatory' });
    }
    if (!values.value) {
      return setValues({ ...values, errorValue: 'value is mandatory' });
    }
    if (0 >= Number(values.value) || Number(values.value) > 40000) {
      return setValues({
        ...values,
        errorValue: 'value cannot be less than 0 and greater than 40000',
      });
    }
    if (!values.imageUri) {
      return setValues({ ...values, errorImageUri: 'image is mandatory' });
    }

    const inventoryItems = await getAsyncStorageItem('inventory');
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
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={styles.buttonsContainer}>
            <Button title="Cancel" onPress={() => navigation.goBack()} />
            <Button title="Add" onPress={handleAdd} />
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
}

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
