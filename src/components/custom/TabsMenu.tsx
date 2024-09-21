import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HomeContent from "./HomeContent"
import { Button } from "../ui/button"
import { PlusCircledIcon } from "@radix-ui/react-icons"
// import type { Song } from "@/interfaces"
// import { useQuery } from "@tanstack/react-query"
// import { toast } from "sonner"

const TabsMenu = () => {
  // const { isPending, error, data: songs } = useQuery({
  //   queryKey: ['songs'],
  //   queryFn: async () => {
  //     const response = await fetch(
  //       'http://localhost:8000/songs',
  //     )
  //     return await response.json()
  //   },
  // })

  // if (isPending) return (<>{
  //   toast("Esta cargando ...", {
  //     description: "Sunday, December 03, 2023 at 9:00 AM",
  //     action: {
  //       label: "Undo",
  //       onClick: () => console.log("Undo"),
  //     },
  //   })}
  // </>)

  // if (error) return (<>{
  //   toast("Error en la carga ...", {
  //     description: "Sunday, December 03, 2023 at 9:00 AM",
  //     action: {
  //       label: "Undo",
  //       onClick: () => console.log("Undo"),
  //     },
  //   })}
  // </>)

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
            {/* {songs.map((song: Song) => (
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
            ))} */}
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
