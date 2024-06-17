import * as yup from "yup";

export const loginSchema = yup.object().shape({
  userName: yup.string().required("username or email is required"),
  password: yup.string().required("password is required"),
});

export const registerFlowOneFormSchema = yup.object().shape({
  fullName: yup.string().required("Fullname is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
      "Invalid email format"
    ),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only numeric values"),
});

export const registerFlowTwoFormSchema = yup.object().shape({
  userName: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup.string().required("Confirm password is required"),
  image: yup.string().required("image is required"),
});

export const searchKeywordSchema = yup.object().shape({
  keyword: yup.string().required("Keyword is empty"),
});
