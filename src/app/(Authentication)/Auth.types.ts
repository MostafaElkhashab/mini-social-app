export type LoginUser = {
  email: string;
  password: string;
};
export type SignUpUser = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string;
  gender: string;
};
export type LoginResponse = {
  message: string;
  token: string;
};
export type SignUpResponse = {
  message: string;
};
