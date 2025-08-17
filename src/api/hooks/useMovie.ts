import { useQuery } from "@tanstack/react-query";
import { api } from "..";

export const useMovie = () => {
  const getMovies = (params: any) =>
    useQuery({
      queryKey: ["movie", params],
      queryFn: () =>
        api.get("discover/movie", { params }).then((res) => res.data),
    });

  const getMovieSingle = (id: string) =>
    useQuery({
      queryKey: ["movie", id],
      queryFn: () => api.get(`movie/${id}`).then((res) => res.data),
    });

  const getMovieDetail = (id: string, path: string) =>
    useQuery({
      queryKey: ["movie", id, path],
      queryFn: () => api.get(`movie/${id}/${path}`).then((res) => res.data),
    });

  const getMovieBySearch = (params: any) =>
    useQuery({
      queryKey: ["movie", params],
      queryFn: () => api.get(`search/movie`).then((res) => res.data),
    });

  return { getMovies, getMovieSingle, getMovieDetail, getMovieBySearch };
};
