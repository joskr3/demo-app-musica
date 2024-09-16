// src/context/AppContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { Playlist, Song, Album } from '@/interfaces';

interface AppContextProps {
  playlists: Playlist[];
  songs: Song[];
  albums: Album[];
  fetchPlaylists: () => void;
  fetchSongs: () => void;
  fetchAlbums: () => void;
}

export const AppContext = createContext<AppContextProps>({
  playlists: [],
  songs: [],
  albums: [],
  fetchPlaylists: () => { },
  fetchSongs: () => { },
  fetchAlbums: () => { },
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);

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

  // Puedes utilizar useEffect para cargar los datos al montar el componente
  useEffect(() => {
    fetchPlaylists();
    fetchSongs();
    fetchAlbums();
  }, []);

  return (
    <AppContext.Provider value={{ playlists, songs, albums, fetchPlaylists, fetchSongs, fetchAlbums }}>
      {children}
    </AppContext.Provider>
  );
};
