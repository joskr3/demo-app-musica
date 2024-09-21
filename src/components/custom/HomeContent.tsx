import SectionCarousel from './SectionCarousel';
import type { Album, Playlist } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';
import { getData } from '@/lib/utils';


const HomeContent = () => {

  const url = 'http://localhost:8000'
  // ################################################################################
  //GET - consulta al backend para obtener los albums y playlists
  // ################################################################################

  //consulta al backend para obtener los albums
  const { data: albums } = useQuery({
    //queryKey: ['albums'], // utilizamos queryKey para identificar la consulta
    queryKey: ['AlbumsQuery'],
    // getData<Album>(url, 'albums') // usamos la función getData para obtener los datos de la API
    queryFn: () => getData<Album>(url, 'albums')
  })

  //consulta al backend para obtener los playlists
  const { data: playlists } = useQuery({
    queryKey: ['PlaylistsQuery'],
    queryFn: () => getData<Playlist>(url, 'playlists')
  })

  const CardsPlaylists = playlists?.map(({ name, description }) => ({
    url: 'https://via.placeholder.com/300x500', // Asigna una URL de imagen adecuada
    titulo: name,
    subtitulo: description,
  })) || []

  const CardsAlbums = albums?.map(album => ({
    url: 'https://via.placeholder.com/300x500', // Asigna una URL de imagen adecuada
    titulo: album.title,
    subtitulo: `${album.year}`,
  })) || []

  return (
    <div className="w-full mx-auto my-4 p-2">
      {/* Supongamos que quieres mostrar playlists */}
      <SectionCarousel
        titulo="Playlists Destacadas"
        descripcion="Disfruta de nuestras playlists"
        cards={CardsPlaylists}
        anchoParaImagenes={300}
        altoParaImagenes={500}
      />
      {/* Mostrar albums */}
      <SectionCarousel
        titulo="Albums Populares"
        descripcion="Los albums más escuchados"
        cards={CardsAlbums}
        anchoParaImagenes={200}
        altoParaImagenes={300}
      />
    </div>
  );
};

export default HomeContent;
