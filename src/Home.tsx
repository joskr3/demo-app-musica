import Main from "./components/custom/Main"
import NavBar from "./components/custom/NavBar"
import SideBar from "./components/custom/SideBar"

const Home = () => {
  return (
    <div className="flex flex-col h-dvh w-dvw">
      <NavBar />
      <div className="flex flex-1 w-full">
        <SideBar />
        <Main />
      </div>
    </div>
  )
}

export default Home
