import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"


const NavBar = () => {
  return (
    <nav className="flex flex-10 p-2 border border-solid border-zinc-400">
      <h1 className="text-pretty font-medium text-sm mr-6 flex self-center">CodiMusic</h1>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Archivo</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>Nuevo</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Playlist</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              Abrir Stream Url <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              Cerrar ventana <MenubarShortcut>⌘C</MenubarShortcut>
            </MenubarItem>
            {/* <MenubarItem disabled>New Incognito Window</MenubarItem> */}
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Libreria</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Actualizar Libreria</MenubarItem>
                <MenubarItem>Actualizar Genius</MenubarItem>
                <MenubarItem>Exportar Libreria</MenubarItem>
                <MenubarItem>Importar Playlist</MenubarItem>
                <MenubarItem disabled>Exportar Playlist</MenubarItem>
                <MenubarItem>Mostrar Duplicados</MenubarItem>
                <MenubarItem>Actualizar Contenido de las caratulas</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Editar</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Find</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Search the web</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Find...</MenubarItem>
                <MenubarItem>Find Next</MenubarItem>
                <MenubarItem>Find Previous</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Vista</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>
              Always Show Full URLs
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem inset>
              Reload <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled inset>
              Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Toggle Fullscreen</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Hide Sidebar</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Cuenta</MenubarTrigger>
          <MenubarContent>
            <MenubarSeparator />
            <MenubarItem inset>Editar...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Aagregar cuenta...</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </nav>
  )
}

export default NavBar
