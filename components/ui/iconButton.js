import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({icon, size, color, onPress}) => {
    return (
      <Pressable style ={(pressed)=>[style.button, pressed && style.pressed ]}>
          <Ionicons name={icon}
                    size={size}
                    color={color}
                    onPress={onPress}
          />
      </Pressable>
    );
};

export default IconButton;

const style = StyleSheet.create({
    button: {
        padding: 8,
        justifyContent: "center",
        alignItems: 'center'
    },
    pressed: {
        opacity: 0.5
    }
});
