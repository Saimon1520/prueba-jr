/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import PostForm from '../../components/PostForm';
import { useRouter } from 'next/navigation';
import { useLoginContext } from '@/context/LoginContext';
import { useEffect, useState } from 'react';

export default function AddPostPage() {
    const router = useRouter();
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isLoggedIn = sessionStorage.getItem('login') === 'true';
            console.log('Valor en sessionStorage:', isLoggedIn); // Depuración
            if (!isLoggedIn) {
                router.push('/login-form');
            }
        }
    }, [router]);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Crear una Publicación</h1>
            <PostForm />
        </div>
    );
}