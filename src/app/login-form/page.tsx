'use client';
import { useState } from "react";
import axios from "axios";
import Link from 'next/link';
import { useLoginContext } from "@/context/LoginContext";
import { Form, Button, Input } from '@nextui-org/react';
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { setLogin, setUserID } = useLoginContext();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/login", { email, password });

            if (response.data.login) {
                sessionStorage.setItem("userId", response.data.userId);
                sessionStorage.setItem("login", "true");
                setLogin(true);
                setUserID(response.data.userId)
            }

            setSuccessMessage(response.data.message);
            setEmail("");
            setPassword("");
            setErrorMessage("");
            router.push("/");
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setErrorMessage(err.response?.data.message || "An error occurred.");
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
            setSuccessMessage("");
        }
    };

    return (
        <div className="flex justify-center min-h-screen">
            <div className="w-full max-w-md p-6 rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">
                    Login
                </h2>
                <Form onSubmit={handleSubmit}>
                    <div className="mb-4 w-full">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                        />
                    </div>
                    {errorMessage && (
                        <p className="mb-4 text-sm text-red-500">{errorMessage}</p>
                    )}
                    {successMessage && (
                        <p className="mb-4 text-sm text-green-500">{successMessage}</p>
                    )}
                    <Button type="submit" fullWidth >
                        Login
                    </Button>
                    <Link
                        href="/"
                        className="mt-4 block text-center w-full"
                    >
                        <Button fullWidth >
                            Sign up
                        </Button>
                    </Link>
                </Form>
            </div>
        </div>
    );
}


