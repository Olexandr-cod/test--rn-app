import React from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {BodyText, SvgIcon} from '../../components/UI';
import {colors, positionHelpers} from '../../styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {DASHBOARD_ROUTES} from '../../navigation/routes';
import {cs} from './styles';

const StatusScreen = () => {
  const navigation = useNavigation<any>();
  const {params} = useRoute<any>();

  const onPress = () => {
    if (params?.icon === 'reject') {
      navigation.goBack();
    } else {
      navigation.navigate(DASHBOARD_ROUTES.USERS_TAB_SCREEN);
    }
  };
  return (
    <SafeAreaView
      style={[positionHelpers.fillCenter, {backgroundColor: colors.white}]}>
      <SvgIcon image={params?.icon} />
      <BodyText
        fontWeight={'400'}
        fontSize={20}
        color={colors.black1}
        marginTop={20}>
        {params?.title}
      </BodyText>
      <TouchableOpacity style={cs.button} onPress={() => onPress()}>
        <BodyText>{params?.titleButton}</BodyText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default StatusScreen;
