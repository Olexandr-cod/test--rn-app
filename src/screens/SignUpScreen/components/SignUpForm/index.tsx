import React from 'react';
import {TouchableOpacity, View, Button, FlatList, Image} from 'react-native';
import {Control, Controller, FieldValues} from 'react-hook-form';
import {BodyText, Input, SvgIcon} from '../../../../components/UI';
import {colors, positionHelpers} from '../../../../styles';
import {PositionItem} from '../../../../redux/PositionRedux/types';
import {cs} from '../../styles';

interface SignUpFormProps {
  error: any;
  error500: any;
  device: any;
  control: Control<FieldValues, any>;
  positions: PositionItem[];
  photo: any;
  selectPhoto: () => void;
  onPress: () => void;
}

const SignUpForm = ({
  control,
  device,
  error,
  error500,
  positions,
  photo,
  selectPhoto,
  onPress,
}: SignUpFormProps) => {
  return (
    <>
      <Controller
        control={control}
        name="name"
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Your name"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            inputStyles={[
              error && error.name ? cs.errorInput : cs.input,
              positionHelpers.mt30,
            ]}
          />
        )}
      />
      {error && error.name && (
        <BodyText style={cs.errorText}>{error.name[0]}</BodyText>
      )}

      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            inputStyles={[
              error && error.email ? cs.errorInput : cs.input,
              positionHelpers.mt20,
            ]}
            keyboardType="email-address"
          />
        )}
      />
      {error && error.email && (
        <BodyText style={cs.errorText}>{error.email[0]}</BodyText>
      )}

      <Controller
        control={control}
        name="phone"
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Phone"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            inputStyles={[
              error && error.phone ? cs.errorInput : cs.input,
              positionHelpers.mt20,
            ]}
            keyboardType="phone-pad"
          />
        )}
      />
      {error && error.phone && (
        <BodyText style={cs.errorText}>{error.phone[0]}</BodyText>
      )}

      <BodyText
        fontWeight={'400'}
        fontSize={18}
        color={colors.black1}
        marginTop={20}>
        Select your position
      </BodyText>
      <Controller
        control={control}
        name="position_id"
        render={({field: {onChange, value}}) => (
          <FlatList
            data={positions}
            keyExtractor={key => key.id.toString()}
            scrollEnabled={false}
            contentContainerStyle={positionHelpers.mt15}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  positionHelpers.alignItemsCenterRow,
                  positionHelpers.mb25,
                  cs.ml10,
                ]}
                onPress={() => onChange(item.id)}>
                {item.id === value ? (
                  <SvgIcon image="activeCheckBox" />
                ) : (
                  <SvgIcon image="defaultCheckBox" />
                )}
                <BodyText
                  fontWeight={'400'}
                  color={colors.black1}
                  marginLeft={20}>
                  {item.name}
                </BodyText>
              </TouchableOpacity>
            )}
          />
        )}
      />
      {error && error.position_id && (
        <BodyText style={cs.errorText}>{error.position_id[0]}</BodyText>
      )}
      <View
        style={[
          error && error.photo ? cs.errorInput : cs.input,
          positionHelpers.rowFillCenter,
          cs.p10,
        ]}>
        <BodyText>{'Upload your photo'}</BodyText>
        <Button title="Upload" onPress={selectPhoto} />
      </View>
      {!device && (
        // <View style={positionHelpers.fillCenter}>
        <BodyText>Camera not available</BodyText>
        // </View>
      )}
      {photo && <Image source={{uri: photo.uri}} style={cs.photoStyle} />}
      {error && error.photo && (
        <BodyText style={cs.errorText}>{error.photo[0]}</BodyText>
      )}
      {error500 && (
        <BodyText
          style={
            cs.errorText
          }>{`[AxiosError: Request failed with status code ${error500}]`}</BodyText>
      )}
      <View style={positionHelpers.alignCenter}>
        <TouchableOpacity style={cs.button} onPress={onPress}>
          <BodyText fontWeight={'600'} fontSize={18} color={colors.black1}>
            Sign up
          </BodyText>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SignUpForm;
