import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { Button, Input } from '../components';
import { RootTabScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { ImagePicker } from '../sdk/ImagePicker';

export default function AddItemScreen({ navigation }: RootTabScreenProps<'AddItemScreen'>) {
  const [values, setValues] = useState({
    name: '',
    value: '',
    description: '',
    errorName: '',
    errorValue: '',
    imageUri: '',
  });
  const handleAdd = () => {
    if (!values.name) {
      return setValues({ ...values, errorName: 'name is mandatory' });
    }
    if (!values.value) {
      return setValues({ ...values, errorValue: 'value is mandatory' });
    }
  };

  const handleImagePicker = async () => {
    const image = await ImagePicker.pickImage();
    setValues({ ...values, imageUri: image.assets[0].uri });
  };
  //KeyboardAvoidingView
  return (
    <ScrollView scrollEnabled={false} style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button title="Cancel" onPress={() => navigation.goBack()} />
        <Button title="Add" onPress={handleAdd} />
      </View>
      <View style={styles.formContainer}>
        <Pressable onPress={handleImagePicker}>
          <View style={styles.imageContainer}>
            {(values.imageUri && (
              <Image
                source={{
                  uri: values.imageUri,
                }}
                style={styles.image}
                resizeMode="cover"
              />
            )) || (
              <View>
                <MaterialIcons name="add-a-photo" size={32} color={colors.mainBlue} />
                <Text style={{ marginTop: 10 }}>Add a photo</Text>
              </View>
            )}
          </View>
        </Pressable>

        <View>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
    paddingTop: 10,
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
