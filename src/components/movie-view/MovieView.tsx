import { IMAGE_URL } from "@/const";
import type { IMovie } from "@/types";
import React, { type FC } from "react";

interface Props {
  data: undefined | IMovie[];
}

const MovieView: FC<Props> = ({ data }) => {
  console.log(data);
  
  return (
    <div className="container mx-auto grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-x-5 gap-y-8">
      {data?.map((movie: IMovie) => (
        <div className="dark:bg-black bg-white cursor-pointer hover:scale-105 transition" key={movie.id}>
          <div>
            <img
              loading="lazy"
              className="rounded-[8px_8px_0_0]"
              src={IMAGE_URL + movie.poster_path}
              alt={movie.title}
            />
          </div>
          <div>
            <h3
              title={movie.title}
              className=" line-clamp-1"
            >
              {movie.title}
            </h3>
            <p>{movie.vote_average}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(MovieView);
