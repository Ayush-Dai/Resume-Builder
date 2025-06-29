import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { signInApi, googleSignInApi } from "../../api/ApiHandler";
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import SignInSchema from '../SchemaValidation/SignInSchema';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import type { TokenResponse } from '@react-oauth/google';

const SignInPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const initialValues = {
        email: '',
        password: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema: SignInSchema,
        onSubmit: async (values, action) => {
            setLoading(true);
            try {
                const response = await signInApi(values);
                console.log(response.data);
                if (response.status === 200 && response.data.user) {
                    const { _id, email, firstName, image } = response.data.user;
                    const obj = { _id, email, firstName, image };
                    console.log(obj);
                    localStorage.setItem('user', JSON.stringify(obj));
                    action.resetForm();
                    window.dispatchEvent(new Event('auth-success'));
                }

                iziToast.success({
                    title: 'Success',
                    message: 'Login successful!',
                    position: 'topRight',
                    timeout: 2000,
                });
                navigate('/home');
            } catch (error: any) {
                iziToast.error({
                    title: 'Error',
                    message: error.response?.data?.message || 'Login failed. Please try again.',
                    position: 'topRight',
                    timeout: 2000,
                });
            } finally {
                setLoading(false);
            }
        },
    });

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;

    const responseGoogle = async (tokenResponse: TokenResponse) => {
        setLoading(true);
        try {
            if (tokenResponse.access_token) {
                const result = await googleSignInApi(tokenResponse.access_token);
                if (result.status === 200 && result.data.user) {
                    const { _id, email, name, image } = result.data.user;
                    const obj = { _id, email, name, image };
                    localStorage.setItem('user', JSON.stringify(obj));
                    window.dispatchEvent(new Event('auth-success'));
                    iziToast.success({
                        title: 'Success',
                        message: 'Login successful!',
                        position: 'topRight',
                        timeout: 2000,
                    });
                    navigate('/');
                }
            }
        } catch (error: any) {
            console.log('error while requesting google login', error);
            iziToast.error({
                title: "Error",
                message: "Something went wrong!",
                position: "topRight",
                close: true,
                transitionIn: "fadeInLeft",
                transitionOut: "fadeOutRight",
                timeout: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: (error) => {
            console.error("Google login error", error);
            iziToast.error({
                title: "Error",
                message: "Google login failed!",
                position: "topRight",
            });
        },
        flow: 'implicit',
        scope: 'openid email profile',
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-700 via-white to-purple-700 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <form method="post" className="shadow-2xl backdrop-blur-sm rounded-lg" onSubmit={handleSubmit}>
                    <div className="space-y-1 pb-4 p-6">
                        <h2 className="text-2xl font-semibold text-center">Sign In</h2>
                    </div>
                    <div className="space-y-6 p-6 pt-0">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="avishek@example.com"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background pl-10"
                                    autoComplete="email"
                                />
                                {errors.email && touched.email && <p className='text-red-400'>{errors.email}</p>}
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={values.password}
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background pl-10 pr-10"
                                    autoComplete="current-password"
                                />
                                {errors.password && touched.password && <p className='text-red-400'>{errors.password}</p>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 h-11 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                                    Loading...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="px-2 text-gray-500">Or continue with Google</span>
                            </div>
                        </div>

                        {/* Sign in with Google */}
                        <div className="space-y-3">
                            <button
                                type="button"
                                onClick={() => !loading && googleLogin()}
                                className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-2 bg-white text-gray-700 hover:shadow-md transition-all cursor-pointer bg-gradient-to-r from-blue-100 to-purple-100 disabled:opacity-60"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                                        Loading...
                                    </span>
                                ) : (
                                    <>
                                        <FcGoogle className="h-5 w-5" />
                                        <span>Sign in with Google</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Signup Link */}
                        <div className="text-center pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium underline">
                                    Create one here
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;