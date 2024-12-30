'use client';

import axios from 'axios';
import { useState, createContext, useContext, ReactNode, useEffect } from 'react';

interface Album {
    id: number;
    title: string;
    userId: number;
}

interface AlbumContextType {
    albums: Album[];
    visibleAlbums: Album[];
    getAlbumTitle: (id: number) => void;
    addAlbum: (title: string) => void;
    editAlbum: (id: number, title: string) => void;
    deleteAlbum: (id: number) => void;
    toggleShowMore: () => void;
    showAllAlbums: boolean;
    error: string | null;
    albumTitle: string | null;
}

const AlbumContext = createContext<AlbumContextType | undefined>(undefined);

export const AlbumProvider = ({ children }: { children: ReactNode }) => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [visibleAlbums, setVisibleAlbums] = useState<Album[]>([]);
    const [showAllAlbums, setShowAllAlbums] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [albumTitle, setAlbumTitle] = useState<string | null>(null);
    const [ userID, setUserID] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = sessionStorage.getItem('userId');
            setUserID(Number(user));
        }
    }, [userID])

    useEffect(() => {
        axios.get('/api/album')
            .then((response) => {
                const userAlbums = response.data.filter((album: Album) => album.userId === Number(userID));
                setAlbums(userAlbums);
                setVisibleAlbums(userAlbums.slice(0, 4));
            })
            .catch((err) => {
                console.error("Error al cargar los álbumes:", err);
                setError("Hubo un error al cargar los álbumes.");
            });
    }, [userID]);

    const getAlbumTitle = (id: number) => {
        const album = albums.find(album => album.id === id) || { title: "" };
        if (album.title !== "") {
            setAlbumTitle(album.title);
        }
    };

    const addAlbum = (title: string) => {
        if (!userID) {
            setError("No se puede agregar el álbum porque el usuario no está definido.");
            return;
        }

        const newAlbum: Omit<Album, 'id'> = {
            title,
            userId: Number(userID),
        };

        axios.post('/api/album', newAlbum)
            .then((response) => {
                const createdAlbum = response.data;
                setAlbums([createdAlbum, ...albums]);
                setVisibleAlbums(showAllAlbums ? [createdAlbum, ...albums] : [createdAlbum, ...albums].slice(0, 4));
                setError(null);
            })
            .catch((err) => {
                console.error("Error al agregar el álbum:", err);
                setError("Hubo un error al agregar el álbum.");
            });
    };

    const editAlbum = (id: number, title: string) => {
        if (!userID) {
            setError("No se puede editar el álbum porque el usuario no está definido.");
            return;
        }

        const updatedAlbum: Album = { id, title, userId: Number(userID) };

        axios.patch(`/api/album`, updatedAlbum)
            .then(() => {
                const updatedAlbums = albums.map(album =>
                    album.id === id ? { ...album, title } : album
                );
                setAlbums(updatedAlbums);
                setVisibleAlbums(showAllAlbums ? updatedAlbums : updatedAlbums.slice(0, 4));
                setError(null);
            })
            .catch((err) => {
                console.error("Error al editar el álbum:", err);
                setError("Hubo un error al editar el álbum.");
            });
    };

    const deleteAlbum = (id: number) => {
        axios.delete(`/api/album`, { data: { id } })
            .then(() => {
                const updatedAlbums = albums.filter(album => album.id !== id);
                setAlbums(updatedAlbums);
                setVisibleAlbums(showAllAlbums ? updatedAlbums : updatedAlbums.slice(0, 4));
                setError(null);
            })
            .catch((err) => {
                console.error("Error al eliminar el álbum:", err);
                setError("Hubo un error al eliminar el álbum.");
            });
    };

    const toggleShowMore = () => {
        setShowAllAlbums(!showAllAlbums);
        setVisibleAlbums(!showAllAlbums ? albums : albums.slice(0, 4));
    };

    return (
        <AlbumContext.Provider value={{
            albums,
            visibleAlbums,
            getAlbumTitle,
            addAlbum,
            editAlbum,
            deleteAlbum,
            toggleShowMore,
            showAllAlbums,
            error,
            albumTitle
        }}>
            {children}
        </AlbumContext.Provider>
    );
};

export const useAlbumContext = () => {
    const context = useContext(AlbumContext);
    if (!context) {
        throw new Error('useAlbumContext must be used within an AlbumProvider');
    }
    return context;
};

