import { useRoutes } from "react-router-dom";
import { routes } from "./router/router";

function App() {
  const Routers = useRoutes(routes);
  return Routers;
}

export default App;
