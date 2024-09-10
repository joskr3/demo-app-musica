import TabsMenu from "./TabsMenu"

const Main = () => {
  return (
    <main className="flex flex-col justify-between p-2  ml-6 w-full">
      {/* <section>menu toggle + boton1</section> */}
      <TabsMenu />
      <section>carousel principal</section>
      <section>corousel secundario</section>
    </main>
  )
}

export default Main
