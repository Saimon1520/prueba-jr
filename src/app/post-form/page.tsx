'use client';

import PostForm from '../../components/PostForm';

export default function AddPostPage() {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Crear una Publicación</h1>
            <PostForm />
        </div>
    );
}