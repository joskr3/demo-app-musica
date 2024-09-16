import { Route, Switch } from "wouter"
import Home from "./Home"
import NotFound from "./NotFound"
import LoginPage from "./components/authentication-04"
import SongsPage from "./Canciones"

const App = () => {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={LoginPage} />
      <Route path="/songs" component={SongsPage} />
      
      {/* Default route in a switch */}
      <Route component={NotFound} />
    </Switch>
  )
}

export default App
