// src/interfaces/index.ts
export interface SidebarItem {
  id: number;
  name: string;
  icon: string;
  path?: string;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

// Tipos existentes
export interface Playlist {
  id: number;
  name: string;
  description: string;
  type: string; // "Playlist" o "Album"
}

export interface Song {
  id: number;
  title: string;
  description: string;
  artwork_url: string;
}

export interface Album {
  id: number;
  title: string;
  artist: string;
  year: number;
}
