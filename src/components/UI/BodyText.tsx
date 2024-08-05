import React, {ReactNode} from 'react';
import {Text, TextStyle, StyleProp, LayoutChangeEvent} from 'react-native';
import {getBodyFontByFontWeight} from '../../utils/font';
import {colors} from '../../styles/colors';

interface Props extends TextStyle {
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
  center?: boolean;
  numberOfLines?: number;
  onLayout?: (event: LayoutChangeEvent) => void;
}

const BodyText: React.FC<Props> = ({
  children,
  style,
  fontWeight = 'normal',
  textAlign,
  color,
  center,
  numberOfLines,
  onLayout,
  ...restProps
}) => {
  return (
    <Text
      style={[
        {
          textAlign: textAlign || (center ? 'center' : 'left'),
          ...restProps,
          fontFamily: getBodyFontByFontWeight(fontWeight),
          color: color ? color : colors.black,
        },
        style,
      ]}
      numberOfLines={numberOfLines}
      onLayout={onLayout}>
      {children}
    </Text>
  );
};

export default BodyText;
