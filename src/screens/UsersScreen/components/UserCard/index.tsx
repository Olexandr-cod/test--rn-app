import React from 'react';
import {View, Image} from 'react-native';
import {BodyText} from '../../../../components/UI';
import {colors, positionHelpers} from '../../../../styles';
import {cs} from './styles';

interface UserCardProps {
  avatar: string;
  name: string;
  position: string;
  email: string;
  phone: string;
}

const UserCard = ({avatar, name, position, email, phone}: UserCardProps) => {
  return (
    <View style={[positionHelpers.flexRow, positionHelpers.mb25]}>
      <Image
        style={cs.avatarStyle}
        source={{
          uri: avatar,
        }}
      />
      <View style={cs.infoContainer}>
        <BodyText fontWeight={'400'} fontSize={18} color={colors.black1}>
          {name}
        </BodyText>
        <BodyText
          fontWeight={'400'}
          fontSize={14}
          marginVertical={10}
          color={colors.black2}>
          {position}
        </BodyText>
        <BodyText
          fontWeight={'400'}
          fontSize={14}
          marginBottom={5}
          color={colors.black1}>
          {email}
        </BodyText>
        <BodyText
          fontWeight={'400'}
          fontSize={14}
          marginBottom={25}
          color={colors.black1}>
          {phone}
        </BodyText>
      </View>
    </View>
  );
};

export default UserCard;
