'use client';

import { useAlbumContext } from '@/context/AlbumContext';
import { Card, CardHeader, CardBody, Image, Button, Input } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginContext } from '@/context/LoginContext';

export default function AlbumsPage() {
    const {
        visibleAlbums,
        addAlbum,
        editAlbum,
        deleteAlbum,
        toggleShowMore,
        showAllAlbums,
        error,
    } = useAlbumContext();

    const [newAlbumTitle, setNewAlbumTitle] = useState('');
    const [editAlbumId, setEditAlbumId] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [isAdding, setIsAdding] = useState(true);
    const router = useRouter();
    const { login } = useLoginContext();

    const handleAddAlbum = () => {
        if (newAlbumTitle.trim() !== '') {
            addAlbum(newAlbumTitle);
            setNewAlbumTitle('');
        }
    };

    const handleEditAlbum = () => {
        if (editAlbumId !== null && editTitle.trim() !== '') {
            console.log(editAlbumId);
            console.log(editTitle);
            editAlbum(editAlbumId, editTitle);
            setEditAlbumId(null);
            setEditTitle('');
            setIsAdding(true);
        }
    };

    const handleEditClick = (albumId: number, albumTitle: string) => {
        setEditAlbumId(albumId);
        setEditTitle(albumTitle);
        setIsAdding(false);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
            const isLoggedIn = login || sessionStorage.getItem('login') === 'true';
            if (!isLoggedIn) {
                router.push('/login-form');
            }
        }, [login, router]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-purple-900 mb-6 text-center">Álbumes</h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {isAdding && (
                <div className="mb-6 flex gap-4 items-center">
                    <Input
                        type="text"
                        placeholder="Título del nuevo álbum"
                        value={newAlbumTitle}
                        onChange={(e) => setNewAlbumTitle(e.target.value)}
                        className="w-full"
                    />
                    <Button onClick={handleAddAlbum} className="bg-green-500 text-white hover:bg-green-700">
                        Agregar
                    </Button>
                </div>
            )}

            {editAlbumId !== null && (
                <div className="mt-6 p-4 rounded-md shadow-lg mb-6">
                    <h3 className="text-xl font-semibold mb-4">Editar Álbum</h3>
                    <Input
                        type="text"
                        placeholder="Nuevo título del álbum"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full mb-4"
                    />
                    <div className="flex justify-end gap-4">
                        <Button
                            onClick={() => {
                                setEditAlbumId(null);
                                setIsAdding(true);
                            }}
                            className="bg-gray-500 text-white hover:bg-gray-700"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleEditAlbum}
                            className="bg-green-500 text-white hover:bg-green-700"
                        >
                            Guardar
                        </Button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {visibleAlbums.map(album => (
                    <Card key={album.id} className="hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center mx-auto">
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                            <h4 className="font-bold text-large text-center">{album.title}</h4>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2 flex justify-center">
                            <Image
                                alt="Album cover"
                                className="object-cover rounded-xl"
                                src="https://nextui.org/images/album-cover.png"
                                width={270}
                            />
                        </CardBody>
                        <div className="p-4 flex flex-col gap-2 items-center">
                            <Button
                                fullWidth
                                onClick={() => handleEditClick(album.id, album.title)}
                                className="bg-blue-500 text-white hover:bg-blue-700"
                            >
                                Editar
                            </Button>
                            <Button
                                fullWidth
                                onClick={() => deleteAlbum(album.id)}
                                className="bg-red-500 text-white hover:bg-red-700"
                            >
                                Eliminar
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="text-center mt-6">
                <Button onClick={toggleShowMore} className="bg-gray-500 text-white hover:bg-gray-700">
                    {showAllAlbums ? 'Mostrar menos' : 'Mostrar más'}
                </Button>
            </div>
        </div>
    );
}


