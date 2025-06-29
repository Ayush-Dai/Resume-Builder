import * as yup from 'yup';

const SignInSchema = yup.object({
    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format"),

    password: yup
        .string()
        .required("Password is required")
        .min(5, "Password must be at least 5 characters"),
});

export default SignInSchema;