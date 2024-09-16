// src/interfaces/index.ts
export interface Playlist {
  id: number;
  name: string;
  description: string;
  type: string;
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
