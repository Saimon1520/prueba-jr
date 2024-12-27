'use client';

import axios from 'axios';
import { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import { usePostContext } from './PostContext';

interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

interface CommentContextType {
    comments: Comment[];
    visibleComments: Comment[];
    getComments: (postId: number) => void;
    getPublicationTitle: (postId: number) => void;
    deleteComment: (id: number, postId: number) => void;
    error: string | null;
    publicationTittle: string | null;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const CommentProvider = ({ children }: { children: ReactNode }) => {
    const { getPostTittle, publicationTittle } = usePostContext();
    const [comments, setComments] = useState<Comment[]>([]);
    let [visibleComments, setVisibleComments] = useState<Comment[]>([]);
    const [error, setError] = useState<string | null>("");
    const [postTitle, setPostTitle] = useState<string | null>("");

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/comments')
            .then((response) => {
                setComments(response.data);
                setVisibleComments(response.data);
            })
            .catch((err) => {
                console.error("Error al cargar las publicaciones:", err);
                setError("Hubo un error al cargar las publicaciones.");
            });
    }, []);

    const getComments = (postId: number) => {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            .then((response) => {
                const filteredComments = comments.filter(comment => comment.postId === postId);
                console.log(filteredComments);
                setVisibleComments(filteredComments);
            })
            .catch((err) => {
                console.error("Error al cargar los comentarios:", err);
                if (err.response) {
                    switch (err.response.status) {
                        case 400:
                            setError("Error 400: Solicitud incorrecta. Por favor verifica los datos enviados.");
                            break;
                        case 404:
                            setError("Error 404: No se pudo encontrar el recurso.");
                            break;
                        case 500:
                            setError("Error 500: Hubo un problema en el servidor.");
                            break;
                        default:
                            setError("Hubo un error al agregar la publicación.");
                    }
                } else {
                    setError("No se pudo conectar con el servidor.");
                }
            });
    };

    const getPublicationTitle = (postId: number) => {
        getPostTittle(postId);
        setPostTitle(publicationTittle);
    }

    const deleteComment = (id: number, postId: number) => {
        axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`)
            .then(() => {
                const updatedComments = comments.filter(comment => comment.id !== id);
                setComments(updatedComments);  // Actualizar lista completa de comentarios
                const updatedVisibleComments = updatedComments.filter(comment => comment.postId === postId);
                setVisibleComments(updatedVisibleComments);
                setError(null);
            })
            .catch((err) => {
                console.error("Error al eliminar el comentario:", err);
                if (err.response) {
                    switch (err.response.status) {
                        case 404:
                            setError("Error 404: No se pudo encontrar el comentario.");
                            break;
                        case 500:
                            setError("Error 500: Hubo un problema en el servidor.");
                            break;
                        default:
                            setError("Hubo un error al eliminar el comentario.");
                    }
                } else {
                    setError("No se pudo conectar con el servidor.");
                }
            });
    };

    return (
        <CommentContext.Provider value={{ comments, visibleComments, getComments, getPublicationTitle, deleteComment, error, publicationTittle }}>
            {children}
        </CommentContext.Provider>
    );
};

export const useCommentContext = () => {
    const context = useContext(CommentContext);
    if (!context) {
        throw new Error('useCommentContext must be used within a CommentProvider');
    }
    return context;
};