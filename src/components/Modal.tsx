import { FC, ReactNode } from 'react';
import { Modal as ModalRN, StyleSheet, View } from 'react-native';

type ModalProps = {
  children: ReactNode;
  modalVisible: boolean;
  setModalVisible: (arg: boolean) => void;
};
export const Modal: FC<ModalProps> = ({ children, modalVisible, setModalVisible }) => {
  return (
    <ModalRN
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      testID="modal"
    >
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </ModalRN>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
