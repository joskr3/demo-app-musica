import React, { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { Button } from '../ui/button';

const SongList: React.FC = () => {
  const { songs, deleteSong } = useContext(AppContext);

  const handleDelete = async (id: number) => {
    await deleteSong(id);
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Canciones</h2>
      <ul>
        {songs.map((song) => (
          <li key={song.id} className="mb-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl">{song.title}</h3>
                <p>{song.description}</p>
              </div>
              <div>
                {/* Botones para editar y eliminar */}
                <Button onClick={() => {/* implementar edición */ }} className="mr-2">
                  Editar
                </Button>
                <Button onClick={() => handleDelete(song.id)}>Eliminar</Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
