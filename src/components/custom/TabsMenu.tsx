import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HomeContent from "./HomeContent"
import { Button } from "../ui/button"
import { PlusCircledIcon } from "@radix-ui/react-icons"


const TabsMenu = () => {
  return (
    <div className="flex  justify-between mx-2 my-0 md:my-6 p-2">
      <Tabs defaultValue="musica" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="musica">Musica</TabsTrigger>
          <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
          <TabsTrigger value="live" disabled>Live</TabsTrigger>
        </TabsList>
        <TabsContent value="musica">
          <HomeContent />
        </TabsContent>
        {/* <TabsContent value="password">Change your password here.</TabsContent> */}
      </Tabs>

      <Button variant="outline" className="w-fit flex md:hidden">
        <PlusCircledIcon  />
      </Button>

      <Button variant="outline" className="w-fit hidden md:flex">
        <PlusCircledIcon className="mr-4" />
        Agregar musica
      </Button>
    </div>
  )
}

export default TabsMenu
