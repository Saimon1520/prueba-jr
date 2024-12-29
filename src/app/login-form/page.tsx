'use client';
import { useState } from "react";
import axios from "axios";
import Link from 'next/link';
import { useLoginContext } from "@/context/LoginContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { login, userID, setLogin, setUserID } = useLoginContext();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/login", { email, password });

            // Almacenar id del usuario y login: true en sessionStorage si la respuesta es exitosa
            if (response.data.login) {
                sessionStorage.setItem("userId", response.data.userId); // Guardar el ID del usuario
                sessionStorage.setItem("login", "true"); // Marcar que el usuario ha iniciado sesión
                setLogin(true);
                setUserID(response.data.userId)
            }

            setSuccessMessage(response.data.message);
            setErrorMessage("");
        } catch (error: any) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("An error occurred. Please try again.");
            }
            setSuccessMessage("");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">
                    Login
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    {errorMessage && (
                        <p className="mb-4 text-sm text-red-500">{errorMessage}</p>
                    )}
                    {successMessage && (
                        <p className="mb-4 text-sm text-green-500">{successMessage}</p>
                    )}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                    <Link
                        href="/"
                        className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 mt-4 block text-center"
                    >
                        Sign up
                    </Link>
                </form>
            </div>
        </div>
    );
}

