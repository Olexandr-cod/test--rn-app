import React from 'react';
// Components
import {
  View,
  ViewStyle,
  StyleProp,
  TextInput,
  TextInputProps,
  StyleSheet,
} from 'react-native';

// Styles & assets
import {colors} from '../../styles/colors';

interface Props extends TextInputProps {
  containerStyles?: StyleProp<ViewStyle>;
  placeholder?: string;
  placeholderTextColor?: string;
  inputStyles?: StyleProp<ViewStyle>;
  colorText?: string;
}

const Input: React.FC<Props> = ({
  containerStyles,
  placeholder,
  placeholderTextColor,
  inputStyles,
  colorText,
  style,
  ...restProps
}) => {
  return (
    <View>
      <View style={containerStyles}>
        <TextInput
          style={[
            styles.input,
            inputStyles,
            style,
            {color: colorText ? colorText : colors.black},
          ]}
          placeholder={placeholder}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : colors.black1
          }
          {...restProps}
        />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    padding: 25,
    backgroundColor: '#fff',
  },
});
