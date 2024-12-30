'use client';

import UserForm from "@/components/UserForm";

export default function RegisterPage() {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Registro</h1>
            <UserForm></UserForm>
        </div>
    );
}