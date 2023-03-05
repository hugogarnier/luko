import * as ExpoImagePicker from 'expo-image-picker';
import { ImagePickerResult } from 'expo-image-picker';

const takePhoto: () => Promise<ImagePickerResult> = async () => {
  const { granted: grantedCamera } = await ExpoImagePicker.requestCameraPermissionsAsync();

  // not supported on iOS simulator, you can use MediaLibrary with pickImage method instead
  if (grantedCamera) {
    const pickerResult = await ExpoImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    return pickerResult;
  }

  return { canceled: true, assets: null };
};

const pickImage: () => Promise<ImagePickerResult> = async () => {
  const { granted } = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();

  if (granted) {
    const pickerResult = await ExpoImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    return pickerResult;
  }
  return { canceled: true, assets: null };
};

export const ImagePicker = {
  takePhoto,
  pickImage,
};
