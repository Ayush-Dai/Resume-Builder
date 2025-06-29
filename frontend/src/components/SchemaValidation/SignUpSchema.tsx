import * as yup from 'yup';

const SignUpSchema = yup.object({
    firstName: yup
        .string()
        .required("Name is required")
        .min(2)
        .max(20),

    lastName: yup
        .string()
        .required("Name is required")
        .min(2)
        .max(20),

    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),

    password: yup
        .string()
        .required("Password is required")
        .min(5, "Password must be at least 5 characters long"),

    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], "Passwords must match")
        .required("Confirm Password is required"),

});

export default SignUpSchema;