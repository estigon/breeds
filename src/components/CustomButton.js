import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomButton = ({handleOnPress, title, bgColor}) => {
  return (
    <TouchableOpacity 
        style={[styles.customButton, bgColor ? { backgroundColor: bgColor } : {} ]}
        onPress={handleOnPress}
      >
        <Text style={[styles.textButton]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    customButton: {
        backgroundColor: '#FFC300',
        width: 150,
        margin: 5,
        alignItems: 'center',
        borderRadius: 10,
    },
    textButton: {
        color: '#FFFFFF',
        fontSize: 22,
        textAlign: 'center'
    },
});

export default CustomButton;