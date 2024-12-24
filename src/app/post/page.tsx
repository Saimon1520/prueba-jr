'use client';

import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    body: string;
}

const PostPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
    const [error, setError] = useState("");
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedBody, setEditedBody] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [showAllPosts, setShowAllPosts] = useState(false);

    const toggleForm = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((response) => {
                setPosts(response.data);
                setVisiblePosts(response.data.slice(0, 4));
            })
            .catch((err) => {
                setError("Error al cargar las publicaciones.");
            });
    }, []);

    const handleEdit = (post: Post) => {
        setEditingPost(post);
        setEditedTitle(post.title);
        setEditedBody(post.body);
    };

    const handleSaveEdit = () => {
        if (editingPost) {
            axios.patch(
                `https://jsonplaceholder.typicode.com/posts/${editingPost.id}`,
                {
                    title: editedTitle,
                    body: editedBody
                }
            )
                .then((response) => {
                    const updatedPosts = posts.map((post) =>
                        post.id === editingPost.id ? { ...post, title: editedTitle, body: editedBody } : post
                    );
                    setPosts(updatedPosts);
                    setEditingPost(null); 
                })
                .catch((err) => {
                    setError("Error al guardar los cambios.");
                });
        }
    };

    const handleAddPost = () => {
        if (newTitle && newBody) {
            const newPostId = posts.length + 1;
            const newPost = {
                id: newPostId, 
                title: newTitle,
                body: newBody,
                userId: 1,  
            };

            axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
                .then((response) => {
                    const newPostWithLocalId = {
                        ...response.data,
                        id: newPostId 
                    };

                    const newPosts = [newPostWithLocalId, ...posts];
                    setPosts(newPosts);

                    if (showAllPosts) {
                        setVisiblePosts(newPosts);
                    } else {
                        setVisiblePosts(newPosts.slice(0, 4));
                    }
                    console.log(newPostWithLocalId);
                    setNewTitle("");
                    setNewBody("");
                })
                .catch((err) => {
                    setError("Error al agregar la publicación.");
                });
        } else {
            setError("Por favor, complete todos los campos.");
        }
    };



    const handleShowMore = () => {
        if (showAllPosts) {
            setVisiblePosts(posts.slice(0, 4));
        } else {
            setVisiblePosts(posts);
        }
        setShowAllPosts(!showAllPosts); 
    };


    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center text-purple-700">Lista de Publicaciones</h1>
            <button
                className="mb-4 text-white bg-purple-600 hover:bg-purple-800 border border-purple-600 hover:border-purple-800 px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 mx-auto block"
                onClick={toggleForm}
            >
                Crear Publicación
            </button>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {isOpen && (
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-2xl font-semibold text-purple-700 mb-4">Agregar Nueva Publicación</h2>
                    <div className="mb-4">
                        <label className="block text-purple-700">Título</label>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-purple-700">Contenido</label>
                        <textarea
                            value={newBody}
                            onChange={(e) => setNewBody(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                            rows={4}
                        />
                    </div>
                    <button
                        onClick={handleAddPost}
                        className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-800"
                    >
                        Agregar Publicación
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {visiblePosts.map((post) => (
                    <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-purple-800">{post.title}</h2>
                            <p className="mt-2 text-gray-700">{post.body}</p>
                        </div>
                        <button
                            onClick={() => handleEdit(post)}
                            className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-800 self-end"
                        >
                            Editar
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={handleShowMore}
                className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-800 mx-auto block"
            >
                {showAllPosts ? "Ver menos" : "Ver más"}
            </button>

            {editingPost && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4">
                        <h2 className="text-2xl font-semibold text-purple-700 mb-4">Editar Publicación</h2>
                        <div className="mb-4">
                            <label className="block text-purple-700">Título</label>
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-purple-700">Contenido</label>
                            <textarea
                                value={editedBody}
                                onChange={(e) => setEditedBody(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                                rows={4}
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={() => setEditingPost(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-800"
                            >
                                Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostPage;

