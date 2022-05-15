import React from 'react';
import { ActivityIndicator, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ModalImage = ({showModal, handleCloseModal, textClose, image}) => {
  return (
    <Modal
        transparent
        visible={showModal}
        onRequestClose={()=>{
            handleCloseModal();
        }}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.text}>RAMDOM IMAGE</Text>
            </View>
            <View style={styles.modalBody}>
              { image.length > 0 ?
                <Image 
                    source={{uri: image}}
                    style={styles.image}
                /> :
                <ActivityIndicator size="large" color="tomato" />
              }
            </View>
            <TouchableOpacity 
              style={styles.customButton}
              onPress={() => handleCloseModal()}
            >
              <Icon name='close' size={50} color='gray' />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  )
}

export default ModalImage;

const styles = StyleSheet.create({  
  text: {
    color: '#000000',
    fontSize: 20,
    fontStyle: 'italic',
  },
  
  customButton: {
    backgroundColor: '#FFC300',
    padding: 5,
    margin: 5,
    alignItems: 'center',
    borderRadius: 10
  },

  textButton: {
    color: '#FFFFFF',
    fontSize: 25,
  },

  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: 300,
    height: 350,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center'
  },

  modalHeader: {
    height: 50,
    width: '100%',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#FFE700',
    backgroundColor: 'tomato',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  modalBody: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },

  image: {
      height: 150,
      width: 150,
      borderRadius: 5,
  },
});