// src/components/custom/HomeContent.tsx
import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import SectionCarousel from './SectionCarousel';

const HomeContent = () => {
  const { playlists, albums } = useContext(AppContext);

  return (
    <div className="w-full mx-auto my-4 p-2">
      {/* Supongamos que quieres mostrar playlists */}
      <SectionCarousel
        titulo="Playlists Destacadas"
        descripcion="Disfruta de nuestras playlists"
        cards={playlists.map(playlist => ({
          url: 'https://via.placeholder.com/300x500', // Asigna una URL de imagen adecuada
          titulo: playlist.name,
          subtitulo: playlist.description,
        }))}
        anchoParaImagenes={300}
        altoParaImagenes={500}
      />

      {/* Mostrar albums */}
      <SectionCarousel
        titulo="Albums Populares"
        descripcion="Los albums más escuchados"
        cards={albums.map(album => ({
          url: 'https://via.placeholder.com/200x300', // Asigna una URL de imagen adecuada
          titulo: album.title,
          subtitulo: album.artist,
        }))}
        anchoParaImagenes={200}
        altoParaImagenes={300}
      />
    </div>
  );
};

export default HomeContent;
