import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import ClubDetail from "./routes/ClubDetail";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "clubs/:clubPk",
        element: <ClubDetail />,
      },
    ],
  },
]);

export default router;
