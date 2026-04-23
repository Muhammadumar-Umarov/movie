import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import NotFound from "./not-found/NotFound";
import Login from "./login/Login";

const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("./home/Home"));
const Movies = lazy(() => import("./movies/Movies"));
const MovieDetail = lazy(() => import("./movies/MovieDetail"));
const PersonDetail = lazy(()=> import("./person-detail/PersonDetail"))
const Saved = lazy(()=> import("./saved/Saved"))

const MainRouter = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/movies",
          element: <Movies />,
        },
        {
          path: "/movie/:id",
          element: <MovieDetail />,
        },
        {
          path: "/person/:id",
          element: <PersonDetail />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: "/saved",
          element: <Saved />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);
};

export default MainRouter;