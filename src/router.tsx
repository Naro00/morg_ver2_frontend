import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import ClubDetail from "./routes/ClubDetail";
import Home from "./routes/Home";
import KakaoConfirm from "./routes/KakaoConfirm";
import NotFound from "./routes/NotFound";
import UploadClub from "./routes/UploadClub";

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
        path: "clubs/upload",
        element: <UploadClub />,
      },
      {
        path: "clubs/:clubPk",
        element: <ClubDetail />,
      },
      {
        path: "social",
        children: [
          {
            path: "kakao",
            element: <KakaoConfirm />,
          },
        ],
      },
    ],
  },
]);

export default router;
