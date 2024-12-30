'use client';

import { useState, useEffect } from 'react';
import { usePostContext } from '../context/PostContext';
import { Form, Input, Textarea, Button } from '@nextui-org/react';

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
        <div className="flex justify-center min-h-screen">
            <Form
                onSubmit={handleSubmit}
                className="w-full max-w-lg flex flex-col gap-4"
                validationBehavior="native"
            >
                {message && (
                    <p className="text-green-500 text-center">
                        {message}
                    </p>
                )}
                <Input
                    isRequired
                    label="Title"
                    labelPlacement="outside"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter the title"
                    aria-label="Title"
                />
                <Textarea
                    isRequired
                    label="Body"
                    labelPlacement="outside"
                    name="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Enter the body content"
                    aria-label="Body"
                />
                <Button color="primary" type="submit">
                    {postId ? 'Edit Post' : 'Add Post'}
                </Button>
            </Form>
        </div>
    );
};

export default PostForm;


