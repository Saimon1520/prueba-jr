/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCommentContext } from '@/context/CommentContext';
import { useLoginContext } from '@/context/LoginContext';
import { Input, Button, Form, Card } from "@nextui-org/react";
import axios from 'axios';

export default function CommentsPage() {
    const router = useRouter();
    const pathname = usePathname();
    const publicationId = pathname?.split('/').pop();
    const { visibleComments, getComments, getPublicationTitle, deleteComment, publicationTittle, addComment } = useCommentContext();
    const { login } = useLoginContext();
    const [showForm, setShowForm] = useState(false);
    const [newComment, setNewComment] = useState({ name: '', body: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const isLoggedIn = login;

        if (!isLoggedIn) {
            router.push('/login-form');
        } else if (publicationId && !Array.isArray(publicationId)) {
            getComments(Number(publicationId));
            getPublicationTitle(Number(publicationId));
        }
    }, [login, publicationId, router]);

    const handleAddComment = async () => {
        if (!newComment.name || !newComment.body) {
            alert("Por favor completa todos los campos.");
            return;
        }

        try {
            const email = sessionStorage.getItem('userEmail');
            addComment({
                postId: Number(publicationId),
                name: newComment.name,
                email: email,
                body: newComment.body,
            }, Number(publicationId))
            setNewComment({ name: '', body: '' })
            setShowForm(false);
        } catch (error) {
            console.error("Error al agregar el comentario:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="">
            <h1 className="text-3xl font-bold text-purple-900 mb-6 text-center">{`Comentarios de la publicación ${publicationTittle}`}</h1>

            <Button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cerrar Formulario' : 'Agregar Comentario'}
            </Button>

            {showForm && (
                <div className="mt-6 p-4 rounded-lg shadow-md">
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAddComment();
                        }}
                    >
                        <Input
                            label="Nombre"
                            placeholder="Escribe tu nombre"
                            value={newComment.name}
                            onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                            required
                        />
                        <Input
                            label="Comentario"
                            placeholder="Escribe tu comentario"
                            value={newComment.body}
                            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
                            required
                            className="mt-4"
                        />
                        <div className="flex justify-end gap-4 mt-4">
                            <Button type="button" color="danger" onClick={() => setShowForm(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Enviando...' : 'Agregar'}
                            </Button>
                        </div>
                    </Form>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                {visibleComments.map((comment) => (
                    <Card
                        key={comment.id}
                        isHoverable
                        className="p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold text-purple-800 mb-2">
                                {comment.name}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-4">
                                {comment.email}
                            </p>
                            <p className="text-gray-700 text-sm sm:text-base">{comment.body}</p>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button
                                color="danger"
                                size="sm"
                                className="bg-red-600 text-white hover:bg-red-800"
                                onClick={() => deleteComment(comment.id, Number(publicationId))}
                            >
                                Eliminar
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}


