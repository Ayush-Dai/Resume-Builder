import { useFormik } from "formik";
import SignUpSchema from "../SchemaValidation/SignUpSchema";
import { signUpApi } from '../../api/ApiHandler';
import { Mail, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { useState } from "react";

const SignupPage =  () => {
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  const formik = useFormik({
    initialValues,
    validationSchema: SignUpSchema,
    onSubmit: async (values, actions) => {
      setLoading(true);
      try {
        const response = await signUpApi(values);
        console.log("data sent", response.data);

        if (response.status === 201) {
          iziToast.success({
            title: "Success",
            message: response?.data?.message,
            position: "topRight",
            timeout: 2000,
          });
          actions.resetForm();
          setTimeout(() => {
            window.location.href = "/login";
          },1000);
        }
      } catch (error: any) {
        console.error("error during signup", error);

        if (error.response && error.response.status === 400) {
          iziToast.warning({
            title: "Warning",
            message: error.response.data.message,
            position: "topRight",
            timeout: 2000,
          });
        } else {
          iziToast.error({
            title: "Error",
            message: "Something went wrong!",
            position: "topRight",
            timeout: 2000,
            close: true,
            transitionIn: "fadeInLeft",
            transitionOut: "fadeOutRight",
          });
        }
      } finally {
        setLoading(false);
      }
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-white to-purple-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form method="post"
          className="shadow-2xl border-0 backdrop-blur-sm  rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="space-y-1 pb-4 p-6">
            <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
          </div>

          <div className="space-y-4 p-6 pt-0">

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Avishek"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background pl-10 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                  {errors.firstName && touched.firstName && <p className='text-red-400'>{errors.firstName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    id="lastName"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Dhimal"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background pl-10 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                  {errors.lastName && touched.lastName && <p className='text-red-400'>{errors.lastName}</p>}
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="avishek@example.com"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background pl-10 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                {errors.email && touched.email && <p className='text-red-400'>{errors.email}</p>}
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Create a strong password"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background pl-10 pr-10 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                {errors.password && touched.password && <p className='text-red-400'>{errors.password}</p>}
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Confirm your password"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background pl-10 pr-10 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                {errors.confirmPassword && touched.confirmPassword && <p className='text-red-400'>{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                  Loading...
                </span>
              ) : (
                'Create Account'
              )}
            </button>






            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium underline">
                  Sign in here
                </Link>
              </p>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
