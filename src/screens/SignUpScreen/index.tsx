import React, {useEffect, useState} from 'react';
import {View, Alert, ActionSheetIOS, Platform} from 'react-native';
import {useForm} from 'react-hook-form';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
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
  const {error, token} = useReduxSelector(state => state?.auth);
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

  const [photo, setPhoto] = useState<any>(null);

  useEffect(() => {
    dispatch(getPositionsAction());
    dispatch(getTokenAction());
  }, [dispatch]);

  const selectPhoto = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Camera', 'Gallery'],
          cancelButtonIndex: 0,
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            launchCamera({mediaType: 'photo'}, response => {
              if (response.assets) {
                setPhoto(response.assets[0]);
              }
            });
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
          onPress: () =>
            launchCamera({mediaType: 'photo'}, response => {
              if (response.assets) {
                setPhoto(response.assets[0]);
              }
            }),
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
        <SignUpForm
          control={control}
          error={error}
          positions={positions}
          photo={photo}
          selectPhoto={selectPhoto}
          onPress={handleSubmit(onSubmit)}
        />
      </FormContainer>
    </View>
  );
};

export default SignUpScreen;
