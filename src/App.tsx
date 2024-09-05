import { Route, Switch } from "wouter"
import Home from "./Home"
import NotFound from "./NotFound"

const App = () => {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* Default route in a switch */}
      <Route component={NotFound} />
    </Switch>
  )
}

export default App
