import { useMovie } from "@/api/hooks/useMovie";
import MovieView from "@/components/movie-view/MovieView";
import React from "react";
import {Pagination} from "antd"
import { useGenre } from "@/api/hooks/useGenre";
import Genre from "@/components/genre/Genre";

const Movies = () => {
  const { getMovies } = useMovie();
  const { getGenres } = useGenre()

  const {data: genreData} = getGenres()
  const { data} = getMovies({ page: 1, without_genres: "18,36,27,10749" });

  console.log(genreData);
  
  return (
    <div>
      <Genre data={genreData?.genres}/>
      <MovieView data={data?.results} />
      <div>
        <Pagination total={500}/>
      </div>
    </div>
  );
};

export default React.memo(Movies);
