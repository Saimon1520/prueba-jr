'use client';

import { useState, useEffect } from 'react';
import { usePostContext } from '../context/PostContext';

interface PostFormProps {
    postId?: number;
}

const PostForm = ({ postId }: PostFormProps) => {
    const { addPost, editPost, posts } = usePostContext();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (postId) {
            const postToEdit = posts.find(post => post.id === postId);
            if (postToEdit) {
                setTitle(postToEdit.title);
                setBody(postToEdit.body);
            }
        }
    }, [postId, posts]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (postId) {
            editPost(postId, title, body);
            setMessage('La publicación ha sido editada!');
        } else {
            addPost(title, body);
            setMessage('La publicación ha sido agregada!');
        }
        setTitle('');
        setBody('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            {message? <p className="text-green-500 text-center">{message}</p> : ""}
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 mb-4 w-full text-black"
                required
            />
            <textarea
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="border p-2 w-full text-black"
                required
            ></textarea>
            <button type="submit" className="bg-purple-700 text-white p-2 mt-4">
                {postId ? 'Edit Post' : 'Add Post'}
            </button>
        </form>
    );
};

export default PostForm;

