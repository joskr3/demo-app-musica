import { createContext, FC, ReactNode } from 'react';
import type { Album, Playlist, SidebarSection, Song } from '@/interfaces';
import { useQuery } from "@tanstack/react-query"
import { getData } from '@/lib/utils';
// import { toast } from "sonner"

interface AppContextProps {
  playlists: Playlist[];
  songs: Song[];
  albums: Album[];
  sidebarSections: SidebarSection[];
}

const initialValue: AppContextProps = {
  playlists: [],
  songs: [],
  albums: [],
  sidebarSections: []
};

export const AppContext = createContext<AppContextProps>(initialValue);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const { data: songs } = useQuery({
    queryKey: ['songs'],
    queryFn: () => getData<Song>('songs')
  })
  const { data: albums } = useQuery({
    queryKey: ['albums'],
    queryFn: () => getData<Album>('albums')
  })
  const { data: playlists } = useQuery({
    queryKey: ['playlists'],
    queryFn: () => getData<Playlist>('playlists')
  })
  const { data: sidebarSections } = useQuery({
    queryKey: ['sidebarSections'],
    queryFn: () => getData<SidebarSection>('sidebar')
  })

  const listaDeCanciones = songs as Song[]
  const listaDeAlbums = albums as Album[]
  const listaDePlaylist = playlists as Playlist[]
  const listaSidebarSections = sidebarSections as SidebarSection[]

  const value: AppContextProps = {
    songs: listaDeCanciones,
    playlists: listaDePlaylist,
    albums: listaDeAlbums,
    sidebarSections: listaSidebarSections
  }

  return (
    <AppContext.Provider
      value={value}
    >
      {children}
    </AppContext.Provider>
  );
};
