/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import PostForm from '../../components/PostForm';
import { useRouter } from 'next/navigation';
import { useLoginContext } from '@/context/LoginContext';
import { useEffect, useState } from 'react';

export default function AddPostPage() {
    const router = useRouter();
    const { login } = useLoginContext();

    useEffect(() => {
                const isLoggedIn = login;
                if (!isLoggedIn) {
                    router.push('/login-form');
                }
            }, [login, router]);
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Crear una Publicación</h1>
            <PostForm />
        </div>
    );
}