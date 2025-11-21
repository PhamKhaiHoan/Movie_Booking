import { useRoutes } from "react-router-dom";
import { routes } from "./router/router";
import { Toaster } from "sonner";

function App() {
  const Routers = useRoutes(routes);

  return (
    <>
      {/* Toaster hiển thị thông báo đẹp mắt cho cả Admin và Client */}
      <Toaster position="top-right" richColors />
      {Routers}
    </>
  );
}

export default App;