import React, {useState, useEffect} from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {BodyText, SvgIcon} from '../../components/UI';
import {colors, positionHelpers} from '../../styles';

import NetInfo from '@react-native-community/netinfo';
import {cs} from './styles';

const InternetCheckScreen = () => {
  const [_, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const againPress = () => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });
  };
  return (
    <SafeAreaView
      style={[positionHelpers.fillCenter, {backgroundColor: colors.white}]}>
      <SvgIcon image={'netInfoIcon'} />
      <BodyText
        fontWeight={'400'}
        fontSize={20}
        color={colors.black1}
        marginTop={20}>
        {'There is no internet connection'}
      </BodyText>
      <TouchableOpacity style={cs.button} onPress={() => againPress()}>
        <BodyText>{'Try again'}</BodyText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default InternetCheckScreen;
