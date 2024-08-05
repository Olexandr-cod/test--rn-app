import React from 'react';
import {TouchableOpacity} from 'react-native';
import {SvgIcon, BodyText} from '../../UI';
import {colors, positionHelpers} from '../../../styles';

const TabNavButton = (props: any) => {
  const {
    style,
    onPress,
    accessibilityState: {selected},
    activeImage,
    title,
  } = props;

  return (
    <TouchableOpacity
      style={[style, positionHelpers.flexRow, positionHelpers.center]}
      onPress={() => onPress()}>
      <SvgIcon
        image={activeImage}
        color={selected ? colors.blue : colors.black2}
      />
      <BodyText
        fontSize={11}
        color={selected ? colors.blue : colors.black2}
        paddingTop={2}
        marginLeft={10}>
        {title}
      </BodyText>
    </TouchableOpacity>
  );
};

export default TabNavButton;
