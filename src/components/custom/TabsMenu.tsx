import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HomeContent from "./HomeContent"
import { Button } from "../ui/button"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { useState, useEffect } from "react"
import type { Song } from "@/interfaces"

async function getSongsData() {
  try {
    const response = await fetch(`http://localhost:8000/songs`);
    if (!response.ok) {
      throw new Error(`Error fetching http://localhost:8000/songs: ${response.statusText}`);
    }
    const data = (await response.json());
    //console.log(data, "DATA EN EL TABSMENU")
    return data;
  } catch (error) {
    console.error(`Error fetching http://localhost:8000/songs:`, error);
    return [];
  }
}

const TabsMenu = () => {

  const datainicial: Song[] = [
    {
      "title": "",
      "description": "",
      "artwork_url": "",
      "id": 0
    }
  ]

  const [songs, setSongs] = useState(datainicial)

  useEffect(() => {
    async function fetchSongs() {
      try {
        const [songsData] = await Promise.all([
          getSongsData()
        ]);
        setSongs(songsData);
      } catch (error) {
        console.error(error)
      }
    }
    fetchSongs().then(() => {
      console.log(songs, "SONGS")
    })
  }, [songs])

  return (
    <div className="flex justify-between my-0 md:my-6 p-2 max-w-[80%] md:max-w-full">
      <Tabs defaultValue="musica" className="w-full">
        <TabsList>
          <TabsTrigger value="albums">Albums</TabsTrigger>
          <TabsTrigger value="canciones">Canciones</TabsTrigger>
          <TabsTrigger value="live" disabled>Live</TabsTrigger>
        </TabsList>
        <TabsContent value="albums" className="max-w-full">
          <HomeContent />
        </TabsContent>
        <TabsContent value="canciones">
          <ul>
            {songs.map((song) => (
              <li key={song?.id} className="mb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl">{song.title}</h3>
                    <p>{song?.description}</p>
                  </div>
                  <div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>

      <Button variant="outline" className="w-fit flex md:hidden">
        <PlusCircledIcon />
      </Button>

      <Button variant="outline" className="w-fit hidden md:flex">
        <PlusCircledIcon className="mr-4" />
        Agregar musica
      </Button>
    </div>
  )
}

export default TabsMenu
