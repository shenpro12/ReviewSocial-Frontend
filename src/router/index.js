import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../features/pages/home";
import Category from "../features/pages/category";
import NotFound from "../features/error/notFound.component";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <NotFound />,
      },
      {
        path: "/danh-muc/:provinceID",
        element: <Category />,
        errorElement: <NotFound />,
      },
    ],
  },
]);

export default router;
