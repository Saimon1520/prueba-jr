'use client';

import { useState } from 'react';
import { usePostContext } from '../../context/PostContext';
import PostForm from '../../components/PostForm';

export default function PostsPage() {
    const { visiblePosts, toggleShowMore, showAllPosts } = usePostContext();
    const [editingPostId, setEditingPostId] = useState<number | null>(null);

    const handleEdit = (post: { id: number, title: string, body: string }) => {
        setEditingPostId(post.id);
    };

    const handleCancelEdit = () => {
        setEditingPostId(null);
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-8">Posts</h1>

            {editingPostId && (
                <div>
                    <PostForm postId={editingPostId} />
                    <button onClick={handleCancelEdit} className="bg-gray-500 text-white p-2 mt-4">
                        Cancel Edit
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
                        <button
                            onClick={() => handleEdit(post)}
                            className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-800 self-end"
                        >
                            Editar
                        </button>
                    </div>
                ))}
            </div>

            <button onClick={toggleShowMore} className="bg-purple-700 text-white p-2 mt-4">
                {showAllPosts ? 'Show Less' : 'Show More'}
            </button>
        </div>
    );
}


