import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {cs} from './styles';
import BodyText from '../../UI/BodyText';

interface CustomHeaderProps {
  title: string;
}

const CustomHeader = ({title}: CustomHeaderProps) => {
  const insets = useSafeAreaInsets();

  const paddingInsets = insets.top ? insets.top + 10 : 20;

  return (
    <View
      style={[
        cs.container,
        {
          paddingTop: paddingInsets,
        },
      ]}>
      <BodyText fontWeight={'400'} fontSize={20}>
        {title}
      </BodyText>
    </View>
  );
};

export default CustomHeader;
