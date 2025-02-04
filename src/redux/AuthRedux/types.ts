export interface LoginProps {
  dataLogin: {
    username: string | undefined;
    password: string | undefined;
  };
  navigation: any;
}

export interface AuthState {
  loading: boolean;
  token: string;
  error500: null | string | any;
  error: any;
}
