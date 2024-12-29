'use client';

import axios from 'axios';
import { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import { useLoginContext } from './LoginContext';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface PostContextType {
    posts: Post[];
    visiblePosts: Post[];
    getPostTittle: (id: number) => void;
    addPost: (title: string, body: string) => void;
    editPost: (id: number, title: string, body: string) => void;
    deletePost: (id: number) => void;
    toggleShowMore: () => void;
    showAllPosts: boolean;
    error: string | null;
    publicationTittle: string | null;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
    const [showAllPosts, setShowAllPosts] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [publicationTittle, setPublicationTittle] = useState<string | null>(null);
    const { userID } = useLoginContext();

    useEffect(() => {
        axios.get('/api/posts')
            .then((response) => {
                // Filtrar publicaciones por userID
                const userPosts = response.data.filter((post: Post) => post.userId === userID);
                setPosts(userPosts);
                setVisiblePosts(userPosts.slice(0, 4));
            })
            .catch((err) => {
                console.error("Error al cargar las publicaciones:", err);
                setError("Hubo un error al cargar las publicaciones.");
            });
    }, [userID]);

    const getPostTittle = (id: number) => {
        const Publicacion = posts.find(publicacion => publicacion.id === id) || { title: "" };
        if (Publicacion.title !== "") {
            setPublicationTittle(Publicacion.title);
        }
    };

    const addPost = (title: string, body: string) => {
        if (!userID) {
            setError("No se puede agregar la publicación porque el usuario no está definido.");
            return;
        }

        const newPost: Post = {
            id: posts.length + 1,
            title,
            body,
            userId: userID,
        };

        axios.post('/api/posts', newPost)
            .then(() => {
                setPosts([newPost, ...posts]);
                setVisiblePosts(showAllPosts ? [newPost, ...posts] : [newPost, ...posts].slice(0, 4));
                setError(null);
            })
            .catch((err) => {
                console.error("Error al agregar la publicación:", err);
                setError("Hubo un error al agregar la publicación.");
            });
    };

    const editPost = (id: number, title: string, body: string) => {
        if (!userID) {
            setError("No se puede editar la publicación porque el usuario no está definido.");
            return;
        }

        const updatedPost: Post = { id, title, body, userId: userID };

        axios.patch(`/api/posts`, updatedPost)
            .then(() => {
                const updatedPosts = posts.map(post =>
                    post.id === id ? { ...post, title, body } : post
                );
                setPosts(updatedPosts);
                setVisiblePosts(showAllPosts ? updatedPosts : updatedPosts.slice(0, 4));
                setError(null);
            })
            .catch((err) => {
                console.error("Error al editar la publicación:", err);
                setError("Hubo un error al editar la publicación.");
            });
    };


    const deletePost = (id: number) => {
        axios.delete(`/api/posts`, { data: { id } })
            .then(() => {
                const updatedPosts = posts.filter(post => post.id !== id);
                setPosts(updatedPosts);
                setVisiblePosts(showAllPosts ? updatedPosts : updatedPosts.slice(0, 4));
                setError(null);
            })
            .catch((err) => {
                console.error("Error al eliminar la publicación:", err);
                setError("Hubo un error al eliminar la publicación.");
            });
    };

    const toggleShowMore = () => {
        setShowAllPosts(!showAllPosts);
        setVisiblePosts(!showAllPosts ? posts : posts.slice(0, 4));
    };

    return (
        <PostContext.Provider value={{ posts, visiblePosts, getPostTittle, addPost, editPost, deletePost, toggleShowMore, showAllPosts, error, publicationTittle }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePostContext = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePostContext must be used within a PostProvider');
    }
    return context;
};

