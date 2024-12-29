'use client';

import { useState, useEffect } from 'react';
import { usePostContext } from '../../context/PostContext';
import PostForm from '../../components/PostForm';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoginContext } from '@/context/LoginContext';

export default function PostsPage() {
    const { visiblePosts, toggleShowMore, showAllPosts, deletePost } = usePostContext();
    const [editingPostId, setEditingPostId] = useState<number | null>(null);
    const { login } = useLoginContext();
    const router = useRouter();

    useEffect(() => {
        // Validar login desde el contexto o sessionStorage
        const isLoggedIn = login || sessionStorage.getItem('login') === 'true';

        if (!isLoggedIn) {
            router.push('/login-form'); // Redirige si no hay sesión activa
        }
    }, [login, router]);

    const handleEdit = (post: { id: number, title: string, body: string }) => {
        setEditingPostId(post.id);
    };

    const handleCancelEdit = () => {
        setEditingPostId(null);
    };

    return (
        <div className="p-4">
            <h1 className='text-3xl font-bold text-purple-900 mb-6 text-center'>Publicaciones</h1>

            {editingPostId && (
                <div>
                    <PostForm postId={editingPostId} />
                    <button onClick={handleCancelEdit} className="bg-gray-500 text-white p-2 mt-4">
                        Cancelar edición
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                {visiblePosts.map(post => (
                    <div
                        key={post.id}
                        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-xl font-semibold text-purple-800">{post.title}</h2>
                            <p className="mt-2 text-gray-700">{post.body}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:self-start sm:flex-wrap gap-4 mt-4">
                            <Link href={`/comments/${post.id}`}>
                                <div className="cursor-pointer bg-blue-600 text-white py-1 px-2 rounded-full hover:bg-blue-800 transition-all duration-300 text-sm sm:text-base text-center">
                                    Ver comentarios
                                </div>
                            </Link>
                            <button
                                onClick={() => handleEdit(post)}
                                className="bg-purple-600 text-white py-1 px-2 rounded-full hover:bg-purple-800 text-sm sm:text-base"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => deletePost(post.id)}
                                className="bg-red-600 text-white py-1 px-2 rounded-full hover:bg-red-800 text-sm sm:text-base"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={toggleShowMore} className="bg-purple-700 text-white p-2 mt-4">
                {showAllPosts ? 'Mostrar menos' : 'Mostrar más'}
            </button>
        </div>
    );
}

