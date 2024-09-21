import ContentSideBar from "./ContentSideBar"

const SideBarDesktop = () => {
  return (
    <aside className="hidden md:flex flex-col gap-12 p-2 ">
      <ContentSideBar />
    </aside>
  )
}

export default SideBarDesktop
