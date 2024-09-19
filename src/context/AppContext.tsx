import { createContext, useState, useEffect, FC, ReactNode } from 'react';
import type { Album, Playlist, SidebarSection, Song } from '@/interfaces';

interface AppContextProps {
  playlists: Playlist[];
  songs: Song[];
  albums: Album[];
  sidebarSections: SidebarSection[];
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

const initialValue: AppContextProps = {
  playlists: [],
  songs: [],
  albums: [],
  sidebarSections: [],
  createPlaylist: async () => { },
  updatePlaylist: async () => { },
  deletePlaylist: async () => { },
  createSong: async () => { },
  updateSong: async () => { },
  deleteSong: async () => { },
  createAlbum: async () => { },
  updateAlbum: async () => { },
  deleteAlbum: async () => { },
};

const url = import.meta.env.VITE_DEV_URL;

export const AppContext = createContext<AppContextProps>(initialValue);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // States for storing data
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [sidebarSections, setSidebarSections] = useState<SidebarSection[]>([]);

  // Generic functions for CRUD operations

  // Function to GET data
  async function getData<T>(endpoint: string): Promise<T[]> {
    try {
      const response = await fetch(`${url}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
      }
      const data = (await response.json()) as T[];
      return data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      return [];
    }
  }

  // Function to POST data
  async function createData<T>(endpoint: string, data: Omit<T, 'id'>): Promise<T | null> {
    try {
      const response = await fetch(`${url}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error creating in ${endpoint}: ${response.statusText}`);
      }
      const newData = (await response.json()) as T;
      return newData;
    } catch (error) {
      console.error(`Error creating in ${endpoint}:`, error);
      return null;
    }
  }

  // Function to PUT data
  async function updateData<T extends { id: number }>(
    endpoint: string,
    data: T
  ): Promise<T | null> {
    try {
      const response = await fetch(`${url}/${endpoint}/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error updating in ${endpoint}: ${response.statusText}`);
      }
      const updatedData = (await response.json()) as T;
      return updatedData;
    } catch (error) {
      console.error(`Error updating in ${endpoint}:`, error);
      return null;
    }
  }

  // Function to DELETE data
  async function deleteData(endpoint: string, id: number): Promise<boolean> {
    try {
      const response = await fetch(`${url}/${endpoint}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error deleting in ${endpoint}: ${response.statusText}`);
      }
      return true;
    } catch (error) {
      console.error(`Error deleting in ${endpoint}:`, error);
      return false;
    }
  }

  // Fetch initial data
  useEffect(() => {
    async function fetchData() {
      try {
        const [playlistsData, songsData, albumsData, sidebarData] = await Promise.all([
          getData<Playlist>('playlists'),
          getData<Song>('songs'),
          getData<Album>('albums'),
          getData<SidebarSection>('sidebar'),
        ]);
        setPlaylists(playlistsData);
        setSongs(songsData);
        setAlbums(albumsData);
        setSidebarSections(sidebarData);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    }

    fetchData();
  }, []);

  // CRUD operations for playlists
  const createPlaylist = async (playlist: Omit<Playlist, 'id'>): Promise<void> => {
    const newPlaylist = await createData<Playlist>('playlists', playlist);
    if (newPlaylist) {
      setPlaylists((prev) => [...prev, newPlaylist]);
    }
  };

  const updatePlaylist = async (playlist: Playlist): Promise<void> => {
    const updatedPlaylist = await updateData<Playlist>('playlists', playlist);
    if (updatedPlaylist) {
      setPlaylists((prev) =>
        prev.map((p) => (p.id === updatedPlaylist.id ? updatedPlaylist : p))
      );
    }
  };

  const deletePlaylist = async (id: number): Promise<void> => {
    const success = await deleteData('playlists', id);
    if (success) {
      setPlaylists((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // CRUD operations for songs
  const createSong = async (song: Omit<Song, 'id'>): Promise<void> => {
    const newSong = await createData<Song>('songs', song);
    if (newSong) {
      setSongs((prev) => [...prev, newSong]);
    }
  };

  const updateSong = async (song: Song): Promise<void> => {
    const updatedSong = await updateData<Song>('songs', song);
    if (updatedSong) {
      setSongs((prev) =>
        prev.map((s) => (s.id === updatedSong.id ? updatedSong : s))
      );
    }
  };

  const deleteSong = async (id: number): Promise<void> => {
    const success = await deleteData('songs', id);
    if (success) {
      setSongs((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // CRUD operations for albums
  const createAlbum = async (album: Omit<Album, 'id'>): Promise<void> => {
    const newAlbum = await createData<Album>('albums', album);
    if (newAlbum) {
      setAlbums((prev) => [...prev, newAlbum]);
    }
  };

  const updateAlbum = async (album: Album): Promise<void> => {
    const updatedAlbum = await updateData<Album>('albums', album);
    if (updatedAlbum) {
      setAlbums((prev) =>
        prev.map((a) => (a.id === updatedAlbum.id ? updatedAlbum : a))
      );
    }
  };

  const deleteAlbum = async (id: number): Promise<void> => {
    const success = await deleteData('albums', id);
    if (success) {
      setAlbums((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <AppContext.Provider
      value={{
        playlists,
        songs,
        albums,
        sidebarSections,
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
