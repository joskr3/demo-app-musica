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
  nombre: string;
  descripcion: string;
  tipo: string; // "Playlist" o "Album"
}

export interface Song {
  id?: number;
  titulo: string;
  descripcion: string;
  url_portada: string;
}

export interface Album {
  id: number;
  titulo: string;
  artista: string;
  anio: number;
}


export interface Usuario { 
  id?: number;
  nombre_usuario: string;
  password: string;
}
