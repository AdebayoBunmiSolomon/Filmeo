import * as yup from "yup";

export const loginSchema = yup.object().shape({
  userName: yup.string().required("username or email is required"),
  password: yup.string().required("password is required"),
});

export const registerFlowOneFormSchema = yup.object().shape({
  fullName: yup.string().required("Fullname is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
});

export const registerFlowTwoFormSchema = yup.object().shape({
  userName: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup.string().required("Confirm password is required"),
});
