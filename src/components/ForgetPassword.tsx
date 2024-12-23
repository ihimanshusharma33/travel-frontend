import axios from 'axios';
import React, { useState } from 'react';
import { API_BASE_URL } from '../api';

const ForgetPassword = () => {
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
    const [otpToken, setOtpToken] = useState<string | null>(null);
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/send-otp`, { email }, {
                headers: { "Content-Type": "application/json" },
            });
            if (response.status === 200) {
                setIsOtpSent(true);
                setSuccess('OTP sent successfully.');
                setTimeout(() => setSuccess(''), 2000);
            } else {
                setError('Failed to send OTP. Please try again later.');
                setTimeout(() => setError(''), 2000);
            }
        } catch (error) {
            setError('Failed to send OTP. Please try again later.');
            setTimeout(() => setError(''), 2000);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, { email, otp }, {
                headers: { "Content-Type": "application/json" },
            });
            if (response.status === 200) {
                setOtpToken(response.data.otpToken); // Store the OTP token
                setSuccess('OTP verified successfully. You can now reset your password.');
                setTimeout(() => setSuccess(''), 2000);
            } else {
                setError('Invalid OTP. Please try again.');
                setTimeout(() => setError(''), 2000);
            }
        } catch (error) {
            setError('Failed to verify OTP. Please try again later.');
            setTimeout(() => setError(''), 2000);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate password and confirmPassword
        if (password !== confirmPassword) {
            setError('Password and Confirm Password do not match.');
            setTimeout(() => setError(''), 2000);
            return;
        }

        // Validate password strength
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const uppercaseRegex = /[A-Z]/;
        const minLength = password.length >= 10;

        if (!specialCharRegex.test(password) || !uppercaseRegex.test(password) || !minLength) {
            setError('Password must contain at least one uppercase letter, one special character, and be at least 10 characters long.');
            setTimeout(() => setError(''), 2000);
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
                email,
                newPassword: password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    otpToken: otpToken,
                },
            });

            if (response.status === 200) {
                setSuccess('Password reset successfully. You can now log in.');
                setTimeout(() => setSuccess(''), 2000);
            } else {
                setError('Failed to reset password. Please try again.');
                setTimeout(() => setError(''), 2000);
            }
        } catch (error) {
            setError('An error occurred while resetting the password.');
            setTimeout(() => setError(''), 2000);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline">{error}</span>
                </div>}
                {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline">{success}</span>
                </div>}

                <h1 className="text-2xl font-semibold text-center mb-6">Forget Password</h1>
                {!otpToken ? (
                    <>
                        {!isOtpSent ? (
                            <form onSubmit={handleEmailSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email:</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Send OTP
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleOtpSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">OTP:</label>
                                    <input
                                        type="text"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Submit OTP
                                </button>
                            </form>
                        )}
                    </>
                ) : (
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">New Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password:</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Reset Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgetPassword;
