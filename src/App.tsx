import { useRoutes } from "react-router-dom";
import { routes } from "./router/router";
import { Toaster } from "sonner";

function App() {
  const Routers = useRoutes(routes);
  return (
    <>
      {/* 2. Thêm Toaster vào đây. richColors giúp thông báo có màu xanh/đỏ đẹp mắt */}
      <Toaster position="top-right" richColors />
      {Routers}
    </>
  );
}

export default App;
