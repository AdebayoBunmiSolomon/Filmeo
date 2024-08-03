export interface loginFormType {
  userName: string;
  password: string;
}

export interface registerFlowOneFormType {
  fullName: string;
  email: string;
  phoneNumber: string;
}

export interface registerFlowTwoFormType {
  userName: string;
  password: string;
}

export interface createUser {
  userName: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
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
}
