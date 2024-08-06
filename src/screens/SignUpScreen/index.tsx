import React, {useEffect, useRef, useState} from 'react';
import {View, Alert, ActionSheetIOS, Platform} from 'react-native';
import {useForm} from 'react-hook-form';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  Camera,
  // CameraDevice,
  useCameraDevices,
  // useFrameProcessor,
} from 'react-native-vision-camera';
import {useReduxDispatch, useReduxSelector} from '../../store/store';
import {getTokenAction, signUpAction} from '../../redux/AuthRedux/AuthAction';
import {getPositionsAction} from '../../redux/PositionRedux/PositionAction';
import FormContainer from '../../components/Layout/FormContainer';
import SignUpForm from './components/SignUpForm';
import {cs} from './styles';
import {useNavigation} from '@react-navigation/native';

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

  const cameraRef = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const [photo, setPhoto] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      if (status !== 'authorized') {
        Alert.alert(
          'Camera Permission',
          'Camera access is required to take photos.',
        );
      }
      setLoading(false);
    })();

    dispatch(getPositionsAction());
    dispatch(getTokenAction());
  }, [dispatch]);

  const takePhotoCallback = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto({
          qualityPrioritization: 'balanced',
          skipMetadata: true,
        });
        setPhoto(photo);
      } catch (error) {
        console.error('Failed to take photo:', error);
        Alert.alert('Error', 'Failed to take photo.');
      }
    }
  };

  const selectPhoto = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Camera', 'Gallery'],
          cancelButtonIndex: 0,
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            takePhotoCallback();
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
          onPress: takePhotoCallback,
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
            device={device}
            error={error}
            error500={error500}
            positions={positions}
            photo={photo}
            selectPhoto={selectPhoto}
            onPress={handleSubmit(onSubmit)}
          />
          {device && (
            <Camera
              ref={cameraRef}
              style={cs.camera}
              device={device}
              isActive={true}
              photoStabilizationMode="standard"
            />
          )}
        </>
      </FormContainer>
    </View>
  );
};

export default SignUpScreen;
