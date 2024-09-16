// src/context/AppContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { Playlist, Song, Album, SidebarSection } from '@/interfaces';

interface AppContextProps {
  playlists: Playlist[];
  songs: Song[];
  albums: Album[];
  sidebarSections: SidebarSection[];
  fetchPlaylists: () => void;
  fetchSongs: () => void;
  fetchAlbums: () => void;
  fetchSidebarSections: () => void;
}

export const AppContext = createContext<AppContextProps>({
  playlists: [],
  songs: [],
  albums: [],
  sidebarSections: [],
  fetchPlaylists: () => { },
  fetchSongs: () => { },
  fetchAlbums: () => { },
  fetchSidebarSections: () => { },
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [sidebarSections, setSidebarSections] = useState<SidebarSection[]>([]);


  const fetchPlaylists = async () => {
    try {
      const response = await fetch('http://localhost:8000/playlists');
      const data = await response.json();
      setPlaylists(data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    }
  };

  const fetchSongs = async () => {
    try {
      const response = await fetch('http://localhost:8000/songs');
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  const fetchAlbums = async () => {
    try {
      const response = await fetch('http://localhost:8000/albums');
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };
  
  const fetchSidebarSections = async () => {
    try {
      const response = await fetch('http://localhost:8000/sidebar');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setSidebarSections(data);
      } else {
        console.error('La data recibida no es un arreglo:', data);
      }
    } catch (error) {
      console.error('Error al obtener las secciones del sidebar:', error);
    }
  };

  // Puedes utilizar useEffect para cargar los datos al montar el componente
  useEffect(() => {
    fetchPlaylists();
    fetchSongs();
    fetchAlbums();
    fetchSidebarSections();
  }, []);

  return (
    <AppContext.Provider value={{
      playlists,
      songs,
      albums,
      sidebarSections,
      fetchPlaylists,
      fetchSongs,
      fetchAlbums,
      fetchSidebarSections,
    }}>
      {children}
    </AppContext.Provider>
  );
};
