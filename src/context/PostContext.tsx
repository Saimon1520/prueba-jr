'use client';

import axios from 'axios';
import { useState, createContext, useContext, ReactNode, useEffect } from 'react';

interface Post {
    id: number;
    title: string;
    body: string;
}

interface PostContextType {
    posts: Post[];
    visiblePosts: Post[];
    addPost: (title: string, body: string) => void;
    editPost: (id: number, title: string, body: string) => void;
    toggleShowMore: () => void;
    showAllPosts: boolean;
    error: string | null;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
    const [showAllPosts, setShowAllPosts] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                setPosts(response.data);
                setVisiblePosts(response.data.slice(0, 4));
            })
            .catch((err) => {
                console.error("Error al cargar las publicaciones:", err);
                setError("Hubo un error al cargar las publicaciones.");
            });
    }, []);

    const addPost = (title: string, body: string) => {
        // Crear un nuevo objeto post con el ID local generado
        const newPost = {
            id: posts.length + 1,  // Sumar 1 al id del último post o asignar 1 si es el primer post
            title,
            body,
            userId: 1,
        };

        // Hacer la solicitud POST a JSONPlaceholder
        axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
            .then((response) => {
                // Agregar el nuevo post al estado local
                setPosts([newPost, ...posts]);
                setVisiblePosts(showAllPosts ? [newPost, ...posts] : [newPost, ...posts].slice(0, 4));
                setError(null);  // Resetea el error si la solicitud fue exitosa
            })
            .catch((err) => {
                console.error("Error al agregar la publicación:", err);
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


    const editPost = (id: number, title: string, body: string) => {
        const updatedPost = { title, body };

        axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedPost)
            .then((response) => {
                const updatedPosts = posts.map(post => post.id === id ? { ...post, title, body } : post);
                setPosts(updatedPosts);
                setVisiblePosts(showAllPosts ? updatedPosts : updatedPosts.slice(0, 4));
                setError(null);
            })
            .catch((err) => {
                console.error("Error al editar la publicación:", err);
                if (err.response) {
                    switch (err.response.status) {
                        case 400:
                            setError("Error 400: Solicitud incorrecta. Por favor verifica los datos enviados.");
                            break;
                        case 404:
                            setError("Error 404: No se pudo encontrar la publicación.");
                            break;
                        case 500:
                            setError("Error 500: Hubo un problema en el servidor.");
                            break;
                        default:
                            setError("Hubo un error al editar la publicación.");
                    }
                } else {
                    setError("No se pudo conectar con el servidor.");
                }
            });
    };

    const toggleShowMore = () => {
        setShowAllPosts(!showAllPosts);
        setVisiblePosts(!showAllPosts ? posts : posts.slice(0, 4));
    };

    return (
        <PostContext.Provider value={{ posts, visiblePosts, addPost, editPost, toggleShowMore, showAllPosts, error }}>
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
