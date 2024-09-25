//import React, { useContext } from 'react';
//import { AppContext } from '@/context/AppContext';
import type { Song } from '@/interfaces';
import { Button } from '../ui/button';
import { getData, url } from '@/lib/utils';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const SongList: React.FC = () => {

  const updateMutation = useMutation({
    mutationFn: (cancion: Song) => {
      return fetch(
        `${url}/canciones/${cancion.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cancion),
        }
      )
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return fetch(
        `${url}/canciones/${id}`,
        {
          method: 'DELETE',
        }
      )
    },
  })


  const { isPending, error, data: songs } = useQuery({
    queryKey: ['songsQuery'],
    queryFn: () => getData<Song>(url, 'canciones')
  })

  if (isPending) return (<>{
    toast("Esta cargando ...", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })}
  </>)

  if (error) return (<>{
    toast("Error en la carga ...", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    })}
  </>)


  // const songsMock: Song[] = [
  //   {
  //     id: 1,
  //     title: 'Title 1',
  //     description: 'Description 1',
  //     artwork_url: 'https://via.placeholder.com/300x500'
  //   },
  //   {
  //     id: 2,
  //     title: 'Title 2',
  //     description: 'Description 2',
  //     artwork_url: 'https://via.placeholder.com/300x500'
  //   },
  //   {
  //     id: 3,
  //     title: 'Title 3',
  //     description: 'Description 3',
  //     artwork_url: 'https://via.placeholder.com/300x500'
  //   },
  // ]

  return (
    <div>
      <h2 className="text-2xl mb-4">Canciones</h2>
      <ul>
        {songs.map((cancionActualizada: Song) => (
          <li key={cancionActualizada.id} className="mb-2">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl">{cancionActualizada.titulo || ''}</h3>
                <p>{cancionActualizada.descripcion || ''}</p>
                <p>{cancionActualizada.url_portada || ''}</p>
              </div>
              <div>
                {/* Botones para editar y eliminar */}
                <Button onClick={() => {
                  updateMutation.mutate({ ...cancionActualizada, id: cancionActualizada.id, titulo: 'titulo Actualizado', descripcion: 'descripcion Actualizada', url_portada: 'url_portada Actualizada' })
                }} className="mr-2">
                  Editar
                </Button>
                <Button onClick={() => deleteMutation.mutate(cancionActualizada?.id || 0)}>Eliminar</Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
