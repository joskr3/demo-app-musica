import React from 'react';
import CreateSongForm from './components/custom/CreateSongForm';
import SongList from './components/custom/SongList';

const SongsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Gestión de Canciones</h1>
      <CreateSongForm />
      <SongList />
    </div>
  );
};

export default SongsPage;
