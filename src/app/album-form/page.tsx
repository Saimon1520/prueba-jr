'use client';

import { useState, useEffect } from 'react';
import { useAlbumContext } from '../../context/AlbumContext';

interface AlbumFormProps {
  albumId?: number;
}

const AlbumForm = ({ albumId }: AlbumFormProps) => {
  const { addAlbum, editAlbum, albums } = useAlbumContext();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (albumId) {
      const albumToEdit = albums.find(album => album.id === albumId);
      if (albumToEdit) {
        setTitle(albumToEdit.title);
      }
    }
  }, [albumId, albums]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (albumId) {
      editAlbum(albumId, title);
      setMessage('El álbum ha sido editado!');
    } else {
      addAlbum(title);
      setMessage('El álbum ha sido agregado!');
    }

    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      {message && <p className="text-green-500 text-center">{message}</p>}
      <input
        type="text"
        placeholder="Album Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-4 w-full text-black"
        required
      />
      <button type="submit" className="bg-purple-700 text-white p-2 mt-4">
        {albumId ? 'Edit Album' : 'Add Album'}
      </button>
    </form>
  );
};

export default AlbumForm;