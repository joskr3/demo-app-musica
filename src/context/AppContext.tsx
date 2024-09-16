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
  createPlaylist: (playlist: Omit<Playlist, 'id'>) => Promise<void>;
  updatePlaylist: (playlist: Playlist) => Promise<void>;
  deletePlaylist: (id: number) => Promise<void>;
  createSong: (song: Omit<Song, 'id'>) => Promise<void>;
  updateSong: (song: Song) => Promise<void>;
  deleteSong: (id: number) => Promise<void>;
  createAlbum: (album: Omit<Album, 'id'>) => Promise<void>;
  updateAlbum: (album: Album) => Promise<void>;
  deleteAlbum: (id: number) => Promise<void>;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estados para almacenar los datos
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [sidebarSections, setSidebarSections] = useState<SidebarSection[]>([]);

  // Funciones para obtener datos del backend
  const fetchPlaylists = async () => {
    try {
      const response = await fetch('http://localhost:8000/playlists');
      const data = await response.json();
      setPlaylists(data);
    } catch (error) {
      console.error('Error al obtener las playlists:', error);
    }
  };

  const fetchSongs = async () => {
    try {
      const response = await fetch('http://localhost:8000/songs');
      const data = await response.json();
      setSongs(data);
    } catch (error) {
      console.error('Error al obtener las canciones:', error);
    }
  };

  const fetchAlbums = async () => {
    try {
      const response = await fetch('http://localhost:8000/albums');
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      console.error('Error al obtener los álbumes:', error);
    }
  };

  const fetchSidebarSections = async () => {
    try {
      const response = await fetch('http://localhost:8000/sidebar');
      const data = await response.json();
      if (Array.isArray(data)) {
        setSidebarSections(data);
      } else {
        console.error('La data recibida no es un arreglo:', data);
        setSidebarSections([]);
      }
    } catch (error) {
      console.error('Error al obtener las secciones del sidebar:', error);
      setSidebarSections([]);
    }
  };

  // Funciones para crear nuevos elementos
  const createPlaylist = async (playlist: Omit<Playlist, 'id'>) => {
    try {
      const response = await fetch('http://localhost:8000/playlists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playlist),
      });
      const newPlaylist = await response.json();
      setPlaylists((prev) => [...prev, newPlaylist]);
    } catch (error) {
      console.error('Error al crear la playlist:', error);
    }
  };

  const createSong = async (song: Omit<Song, 'id'>) => {
    try {
      const response = await fetch('http://localhost:8000/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(song),
      });
      const newSong = await response.json();
      setSongs((prev) => [...prev, newSong]);
    } catch (error) {
      console.error('Error al crear la canción:', error);
    }
  };

  const createAlbum = async (album: Omit<Album, 'id'>) => {
    try {
      const response = await fetch('http://localhost:8000/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(album),
      });
      const newAlbum = await response.json();
      setAlbums((prev) => [...prev, newAlbum]);
    } catch (error) {
      console.error('Error al crear el álbum:', error);
    }
  };

  // Funciones para actualizar elementos existentes
  const updatePlaylist = async (playlist: Playlist) => {
    try {
      const response = await fetch(`http://localhost:8000/playlists/${playlist.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playlist),
      });
      const updatedPlaylist = await response.json();
      setPlaylists((prev) =>
        prev.map((p) => (p.id === updatedPlaylist.id ? updatedPlaylist : p))
      );
    } catch (error) {
      console.error('Error al actualizar la playlist:', error);
    }
  };

  const updateSong = async (song: Song) => {
    try {
      const response = await fetch(`http://localhost:8000/songs/${song.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(song),
      });
      const updatedSong = await response.json();
      setSongs((prev) =>
        prev.map((s) => (s.id === updatedSong.id ? updatedSong : s))
      );
    } catch (error) {
      console.error('Error al actualizar la canción:', error);
    }
  };

  const updateAlbum = async (album: Album) => {
    try {
      const response = await fetch(`http://localhost:8000/albums/${album.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(album),
      });
      const updatedAlbum = await response.json();
      setAlbums((prev) =>
        prev.map((a) => (a.id === updatedAlbum.id ? updatedAlbum : a))
      );
    } catch (error) {
      console.error('Error al actualizar el álbum:', error);
    }
  };

  // Funciones para eliminar elementos
  const deletePlaylist = async (id: number) => {
    try {
      await fetch(`http://localhost:8000/playlists/${id}`, {
        method: 'DELETE',
      });
      setPlaylists((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error al eliminar la playlist:', error);
    }
  };

  const deleteSong = async (id: number) => {
    try {
      await fetch(`http://localhost:8000/songs/${id}`, {
        method: 'DELETE',
      });
      setSongs((prev) => prev.filter((s) => s.id !== id));
    } catch (error) {
      console.error('Error al eliminar la canción:', error);
    }
  };

  const deleteAlbum = async (id: number) => {
    try {
      await fetch(`http://localhost:8000/albums/${id}`, {
        method: 'DELETE',
      });
      setAlbums((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error('Error al eliminar el álbum:', error);
    }
  };

  // Efecto para cargar los datos al montar el componente
  useEffect(() => {
    fetchPlaylists();
    fetchSongs();
    fetchAlbums();
    fetchSidebarSections();
  }, []);

  // Proveedor del contexto
  return (
    <AppContext.Provider
      value={{
        playlists,
        songs,
        albums,
        sidebarSections,
        fetchPlaylists,
        fetchSongs,
        fetchAlbums,
        fetchSidebarSections,
        createPlaylist,
        updatePlaylist,
        deletePlaylist,
        createSong,
        updateSong,
        deleteSong,
        createAlbum,
        updateAlbum,
        deleteAlbum,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
