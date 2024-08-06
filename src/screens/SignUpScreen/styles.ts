import {StyleSheet} from 'react-native';
import {colors} from '../../styles';

export const cs = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.silver1,
    padding: 18,
    marginVertical: 8,
    borderRadius: 4,
  },
  errorInput: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 18,
    marginVertical: 8,
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
  },
  photoStyle: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
    padding: 15,
    paddingHorizontal: 40,
    backgroundColor: colors.yellow,
    alignItems: 'center',
    borderRadius: 40,
    marginBottom: 10,
  },
  camera: {
    width: '100%',
    height: '80%',
  },
  ml10: {
    marginLeft: 10,
  },
  p10: {
    padding: 10,
  },
});
