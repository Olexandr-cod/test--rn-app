import React, {useEffect, useRef, useState} from 'react';
import {View, Alert, ActionSheetIOS, Platform} from 'react-native';
import {useForm} from 'react-hook-form';
import {launchImageLibrary} from 'react-native-image-picker';
import {RNCamera} from 'react-native-camera';
import {useReduxDispatch, useReduxSelector} from '../../store/store';
import {getTokenAction, signUpAction} from '../../redux/AuthRedux/AuthAction';
import {getPositionsAction} from '../../redux/PositionRedux/PositionAction';
import FormContainer from '../../components/Layout/FormContainer';
import SignUpForm from './components/SignUpForm';
import {cs} from './styles';
import {useNavigation} from '@react-navigation/native';
import {positionHelpers} from '../../styles';

interface FormData {
  name?: string;
  email?: string;
  phone?: string;
  position_id?: number;
  photo?: any;
}

const SignUpScreen = () => {
  const dispatch = useReduxDispatch();
  const {error, error500, token} = useReduxSelector(state => state?.auth);
  const {positions} = useReduxSelector(state => state?.position);
  const navigation = useNavigation();
  const {control, handleSubmit} = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      position_id: 1,
      photo: null,
    },
  });

  const cameraRef = useRef<RNCamera>(null);
  const [photo, setPhoto] = useState<any>(null);

  useEffect(() => {
    dispatch(getPositionsAction());
    dispatch(getTokenAction());
  }, [dispatch]);

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      setPhoto(data);
    }
  };

  console.log('error500', error500);
  const selectPhoto = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Camera', 'Gallery'],
          cancelButtonIndex: 0,
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            takePicture();
          } else if (buttonIndex === 2) {
            launchImageLibrary({mediaType: 'photo'}, response => {
              if (response.assets) {
                setPhoto(response.assets[0]);
              }
            });
          }
        },
      );
    } else {
      Alert.alert('Choose a photo', 'Select from camera or gallery', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Camera',
          onPress: takePicture,
        },
        {
          text: 'Gallery',
          onPress: () =>
            launchImageLibrary({mediaType: 'photo'}, response => {
              if (response.assets) {
                setPhoto(response.assets[0]);
              }
            }),
        },
      ]);
    }
  };

  const onSubmit = (data: FormData) => {
    const createData = {
      dataBody: {
        ...data,
        photo,
      },
      token,
      navigation,
    };
    dispatch(signUpAction(createData));
  };

  return (
    <View style={cs.container}>
      <FormContainer>
        <>
          <SignUpForm
            control={control}
            error={error}
            error500={error500}
            positions={positions}
            photo={photo}
            selectPhoto={selectPhoto}
            onPress={handleSubmit(onSubmit)}
          />
          <RNCamera
            ref={cameraRef}
            style={[positionHelpers.fill, cs.camera]}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
          />
        </>
      </FormContainer>
    </View>
  );
};

export default SignUpScreen;
