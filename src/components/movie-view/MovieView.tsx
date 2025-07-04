import { IMAGE_URL } from "@/const";
import type { IMovie } from "@/types";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import React, { type FC } from "react";
import { useNavigate } from "react-router-dom";
import dfImage from "@/assets/dfImage.jpg"
interface Props {
  data: undefined | IMovie[];
}

const MovieView: FC<Props> = ({ data }) => {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto ">

      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-x-5 gap-y-8 w-full">
        {data?.map((movie: IMovie) => (
          <div onClick={() => navigate(`/movie/${movie.id}`)} className="dark:bg-black bg-white cursor-pointer overflow-hidden" key={movie.id}>
            <div>
              <img loading="lazy" className="rounded-[8px_8px_0_0] mb-1.5 hover:scale-[103%] transition overflow-hidden" src={movie.poster_path === null ? dfImage : IMAGE_URL + movie.poster_path} alt={movie.title} />
              <p className="flex items-center gap-1 mb-1 text-[12px]"><StarFilled style={{ color: "yellow" }}></StarFilled>{movie.vote_average} <StarOutlined style={{ marginLeft: 16, color: "dodgerblue" }}></StarOutlined></p>
            </div>
            <div>
              <h3 title={movie.title} className="font-bold text-[18px] line-clamp-1">
                {movie.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(MovieView);
