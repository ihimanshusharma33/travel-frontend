import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState({ length: false, specialChar: false, uppercase: false });
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const validatePassword = (password: string) => {
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        const uppercaseRegex = /[A-Z]/;
        const minLength = password.length >= 10;
        const hasSpecialChar = specialCharRegex.test(password);
        const hasUppercase = uppercaseRegex.test(password);

        setPasswordValid({
            length: minLength,
            specialChar: hasSpecialChar,
            uppercase: hasUppercase,
        });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPasswordInput = e.target.value;
        setConfirmPassword(confirmPasswordInput);
        setPasswordMismatch(confirmPasswordInput !== password);
    };
    const navigateToLogin = () => {
        setTimeout(() => {
            navigate('/login');
        },2000);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password === confirmPassword && passwordValid.length && passwordValid.specialChar && passwordValid.uppercase) {
            setLoading(true);
            try {
                const response = await axios.post(`${API_BASE_URL}/auth/register`, { name, email, phone, password }, { headers: { "Content-Type": "application/json" } });
                if (response.status === 201) {
                    setLoading(false);
                    setSuccess("Registration successful. Please login to continue.");
                }

            }
            catch (err: any) {
                setError(err.response.data.message);
            }
            finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setError("");
        }, 2000)
    }, [error])

    useEffect(() => {
        if (success) {
            // Optional: Show a confirmation or wait for user interaction
            navigateToLogin();
        }
    },[success])

    const isFormValid =
        password === confirmPassword &&
        passwordValid.length &&
        passwordValid.specialChar &&
        passwordValid.uppercase;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">

                {loading && <div className="fixed top-20 left-50 text-red-500 mb-4  border"><p className=" rounded-md bg-blue-500 text-white px-10 py-3">Please wait ...</p></div>}
                {error && <div className="fixed top-20 left-50 text-red-500 mb-4  border"><p className=" rounded-md bg-red-500 text-white px-10 py-3">{error}</p></div>}
                {success && <div className="fixed top-20 left-50 text-green-500 mb-4  border"><p className=" rounded-md bg-green-500 text-white px-10 py-3">{success}</p></div>}
                <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

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

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone:</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            className={`mt-1 block w-full px-4 py-2 border ${passwordValid.length && passwordValid.specialChar && passwordValid.uppercase
                                ? 'border-green-500'
                                : 'border-red-500'
                                } rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
                        />
                        <ul className="mt-2 text-sm">
                            {!passwordValid.length && <li className={`text-red-500`}>
                                Password must be at least 10 characters long.
                            </li>}
                            {!passwordValid.specialChar &&
                                <li className={`text-red-500`}>
                                    Password must contain at least one special character.
                                </li>}
                            {
                                !passwordValid.uppercase && <li className={`text-red-500`}>
                                    Password must contain at least one uppercase letter.
                                </li>
                            }
                        </ul>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {passwordMismatch && (
                            <p className="text-red-500 text-sm mt-2">Passwords do not match.</p>
                        )}
                    </div>
                    <div className="mt-4">
                        <Link to="/login" className="text-blue-500 hover:underline">Already have account ? Login here !</Link>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            disabled={!isFormValid}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
