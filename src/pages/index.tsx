import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import NotFound from "./not-found/NotFound";

const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("./home/Home"));
const Movies = lazy(() => import("./movies/Movies"));
const MovieDetail = lazy(() => import("./movies/MovieDetail"));
const PersonDetail = lazy(()=> import("./person-detail/PersonDetail"))

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
      ],
    },
  ]);
};

export default MainRouter;
