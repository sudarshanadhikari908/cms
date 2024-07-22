export interface LoginInterface {
  data: {
    username: string;
    password: string;
    rememberme: boolean;
  };
}

export interface RegisterInterface {
  username: string;
  email: string;
  password: string;
  name: string;
}

export interface ForgetPasswordInterface {
  email: string;
}

export interface ResetPasswordInterface {
  token: string;
  password: string;
  confirmPassword: string;
}
