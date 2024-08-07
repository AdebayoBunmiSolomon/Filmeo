import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("username or email is required"),
  password: yup.string().required("password is required"),
});

export const registerFlowOneFormSchema = yup.object().shape({
  fullname: yup.string().required("Fullname is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
      "Invalid email format"
    ),
  phone_number: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only numeric values"),
});

export const registerFlowTwoFormSchema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup
    .string()
    .required("password is required")
    .min(8, "password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "passwords must match")
    .required("confirm password is required"),
  image: yup.string().required("image is required"),
});

export const searchKeywordSchema = yup.object().shape({
  keyword: yup.string().required("Keyword is empty"),
});

export const searchMovieCompFormSchema = yup.object().shape({
  movieTitle: yup.string().required("movie title is required"),
  includeAdult: yup.string().required("please include adult"),
  releaseYear: yup.string().required("please select a release year"),
  region: yup.string().required("region is not selected"),
});

export const xTensiveSearchMovieCompFormSchema = yup.object().shape({
  movieTitle: yup.string().required("movie title is required"),
  includeAdult: yup.string().required("please include adult"),
});

export const otpInputFormSchema = yup.object().shape({
  otpInput: yup.string().required("one time pin is required"),
});
