import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../features/pages/home";
import Category from "../features/pages/category";
import NotFound from "../features/error/notFound.component";
import Contact from "../features/pages/contact";
import CreatePost from "../features/pages/createPost";

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
        path: "/lien-he",
        element: <Contact />,
        errorElement: <NotFound />,
      },
      {
        path: "/danh-muc",
        element: <Category />,
        errorElement: <NotFound />,
      },
      {
        path: "/create-post",
        element: <CreatePost />,
        errorElement: <NotFound />,
      },
    ],
  },
]);

export default router;
