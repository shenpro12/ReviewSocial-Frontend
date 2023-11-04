import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../features/pages/home";
import Category from "../features/pages/category";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>error</h1>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        errorElement: <h1>error</h1>,
      },
      {
        path: "/danh-muc/:provinceID",
        element: <Category></Category>,
        errorElement: <h1>error</h1>,
      },
    ],
  },
]);

export default router;
