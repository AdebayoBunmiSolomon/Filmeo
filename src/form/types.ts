export interface loginFormType {
  username: string;
  password: string;
}

export interface registerFlowOneFormType {
  fullname: string;
  email: string;
  phone_number: string;
}

export interface registerFlowTwoFormType {
  userName: string;
  password: string;
}

export interface createUser {
  fullname: string | undefined;
  email: string | undefined;
  phone_number: string | undefined;
  username: string | undefined;
  password: string | undefined | null;
  avatar_url: string | undefined | null;
  avatar_name: string | undefined | null;
  created_at: string | undefined;
  updated_at: string | undefined;
}

export interface searchKeywordType {
  keyword: string;
}

export interface searchMovieCompFormType {
  movieTitle: string;
  includeAdult: string;
  releaseYear: string;
  region: string;
}

export interface xtensiveSearchMovieCompFormType {
  movieTitle: string;
  includeAdult: string;
}

export interface otpFormType {
  otpInput: string;
}

export interface tokenFormDataType {
  date_created: string | undefined;
  device_name: string | undefined | null;
  device_type: string | undefined;
  id: string | undefined;
  token: string | undefined;
  subscribed: boolean | undefined;
}

export interface flowOneFormDataType {
  fullname: string | undefined;
  email: string | undefined;
  phone_number: string | undefined;
}

export interface flowTwoFormDataType {
  username: string | undefined;
  password: string | undefined;
  // avatar_url: File;
}

export interface loginFormDataType {
  username: string | undefined;
  password: string | undefined;
}
