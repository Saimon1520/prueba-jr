/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useState, useEffect } from 'react';
import { usePostContext } from '../../context/PostContext';
import PostForm from '../../components/PostForm';
import { useRouter } from 'next/navigation';
import { useLoginContext } from '@/context/LoginContext';
import { Card, CardHeader, CardBody, CardFooter, Divider, Button } from '@nextui-org/react';

export default function PostsPage() {
    const { visiblePosts, toggleShowMore, showAllPosts, deletePost } = usePostContext();
    const [editingPostId, setEditingPostId] = useState<number | null>(null);

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

    const handleEdit = (post: { id: number; title: string; body: string }) => {
        setEditingPostId(post.id);
    };

    const handleCancelEdit = () => {
        setEditingPostId(null);
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Publicaciones</h1>

            {editingPostId && (
                <div className="mb-6">
                    <PostForm postId={editingPostId} />
                    <Button color="default" onClick={handleCancelEdit} className="mt-4">
                        Cancelar edición
                    </Button>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visiblePosts.map(post => (
                    <Card key={post.id} className="hover:shadow-xl transition-shadow">
                        <CardHeader>
                            <h2 className="text-lg font-semibold text-gray-700">{post.title}</h2>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p className="text-gray-700">{post.body}</p>
                        </CardBody>
                        <Divider />
                        <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-4">
                            <Button fullWidth onClick={() => { router.push(`/comments/${post.id}`) }}>
                                Ver comentarios
                            </Button>
                            <Button fullWidth onClick={() => handleEdit(post)}>
                                Editar
                            </Button>
                            <Button fullWidth className="warning" style={{ backgroundColor: 'var(--warning-color)' }} onClick={() => deletePost(post.id)}>
                                Eliminar
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="mt-6 text-center">
                <Button color="primary" onClick={toggleShowMore}>
                    {showAllPosts ? 'Mostrar menos' : 'Mostrar más'}
                </Button>
            </div>
        </div>
    );
}


