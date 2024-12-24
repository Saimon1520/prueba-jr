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
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(
            'https://jsonplaceholder.typicode.com/posts'
        ).then((response) => {
            setPosts(response.data);
        }).catch((err) => {
            setError("Error al cargar las publicaciones.")
        })
    }, [])

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center text-purple-700">Lista de Publicaciones</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                        <h2 className="text-xl font-semibold text-purple-800">{post.title}</h2>
                        <p className="mt-2 text-gray-700">{post.body}</p>
                        <button className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-800">
                            Editar
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostPage;