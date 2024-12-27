'use client';

import { useState, useEffect, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCommentContext } from '@/context/CommentContext';

export default function CommentsPage() {
    const router = useRouter();
    const pathname = usePathname();
    const publicationId = pathname?.split('/').pop();
    const { comments, visibleComments, getComments, getPublicationTitle, deleteComment, error, publicationTittle } = useCommentContext();

    useEffect(() => {
        if (publicationId !== undefined && publicationId !== '' && !Array.isArray(publicationId)) {
            getComments(Number(publicationId));
            getPublicationTitle(Number(publicationId));
        }
    }, []);

    return (
        <div className='text-center'>
            <h1 className='text-3xl font-bold text-purple-900 mb-6'>{`Comentarios de la publicación ${publicationTittle}`}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                {visibleComments.map(comment => (
                    <div
                        key={comment.id}
                        className="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-gray-200"
                    >
                        <div className="flex flex-col">
                            <h2 className="text-lg sm:text-xl font-semibold text-purple-800">{comment.name}</h2>
                            <p className="mt-1 text-sm sm:text-base text-gray-600">{comment.email}</p>
                            <p className="mt-3 text-gray-700 text-sm sm:text-base">{comment.body}</p>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => deleteComment(comment.id, Number(publicationId))}
                                className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-800 text-sm sm:text-base transition-all duration-300"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};