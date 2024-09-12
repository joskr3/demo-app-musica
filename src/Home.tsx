import Main from "./components/custom/Main"
import NavBar from "./components/custom/NavBar"
import SideBar from "./components/custom/SideBar"
import SideBarDesktop from "./components/custom/SideBarDesktop"

const Home = () => {
  return (
    <div className="flex flex-col h-dvh w-dvw">
      <NavBar />
      <div className="flex flex-1 w-full">
        <SideBarDesktop/>
        <SideBar />
        <Main />
      </div>
    </div>
  )
}

export default Home
