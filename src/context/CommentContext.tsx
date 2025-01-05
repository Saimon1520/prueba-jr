'use client';

import axios from 'axios';
import { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import { usePostContext } from './PostContext';

interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string | null;
    body: string;
}

interface CommentContextType {
    comments: Comment[];
    visibleComments: Comment[];
    getComments: (postId: number) => void;
    getPublicationTitle: (postId: number) => void;
    deleteComment: (id: number, postId: number) => void;
    addComment: (newComment: Omit<Comment, 'id'>, postId: number) => void;
    error: string | null;
    publicationTittle: string | null;
    postTitle: string | null;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const CommentProvider = ({ children }: { children: ReactNode }) => {
    const { getPostTittle, publicationTittle } = usePostContext();
    const [comments, setComments] = useState<Comment[]>([]);
    const [visibleComments, setVisibleComments] = useState<Comment[]>([]);
    const [error, setError] = useState<string | null>('');
    const [postTitle, setPostTitle] = useState<string | null>('');

    useEffect(() => {
        axios.get('/api/comment')
            .then((response) => {
                setComments(response.data);
                setVisibleComments(response.data);
            })
            .catch((err) => {
                console.error("Error al cargar los comentarios:", err);
                setError("Hubo un error al cargar los comentarios.");
            });
    }, []);

    const getComments = (postId: number) => {
        const filteredComments = comments.filter(comment => comment.postId === postId);
        setVisibleComments(filteredComments);
    };

    const getPublicationTitle = (postId: number) => {
        getPostTittle(postId);
        setPostTitle(publicationTittle);
    };

    const deleteComment = (id: number, postId: number) => {
        axios.delete(`/api/comment`, { data: { id } })
            .then(() => {
                const updatedComments = comments.filter(comment => comment.id !== id);
                setComments(updatedComments);
                setVisibleComments(updatedComments.filter(comment => comment.postId === postId));
                setError(null);
            })
            .catch((err) => {
                console.error("Error al eliminar el comentario:", err);
                setError("Hubo un error al eliminar el comentario.");
            });
    };

    const addComment = (newComment: Omit<Comment, 'id'>, postId: number) => {
        axios.post('/api/comment', newComment)
            .then((response) => {
                const createdComment = response.data;
                const updatedComments = [...comments, createdComment];
                setComments(updatedComments);
                setVisibleComments(updatedComments.filter(comment => comment.postId === postId));
                setError(null);
            })
            .catch((err) => {
                console.error("Error al agregar el comentario:", err);
                setError("Hubo un error al agregar el comentario.");
            });
    };

    return (
        <CommentContext.Provider value={{
            comments,
            visibleComments,
            getComments,
            getPublicationTitle,
            deleteComment,
            addComment,
            error,
            publicationTittle,
            postTitle,
        }}>
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
