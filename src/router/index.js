import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../features/pages/home";

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
    ],
  },
]);

export default router;
