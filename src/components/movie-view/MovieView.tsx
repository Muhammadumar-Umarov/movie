"use client"

import { IMAGE_URL } from "@/const"
import type { IMovie } from "@/types"
import { StarFilled, CalendarOutlined, PlayCircleOutlined } from "@ant-design/icons"
import React, { type FC } from "react"
import { useNavigate } from "react-router-dom"
import MovieViewSkeleton from "./MovieViewSkeleton"

interface Props {
  data: undefined | IMovie[]
  isLoading?: boolean
  viewMode?: "grid" | "list"
}

const MovieView: FC<Props> = ({ data, isLoading = false,}) => {
  const navigate = useNavigate()

 

  const getImageSrc = (movie: IMovie) => {
    return IMAGE_URL + movie.poster_path
  }

  const formatRating = (rating: number) => {
    return rating ? rating.toFixed(1) : "N/A"
  }

  const getYear = (dateString: string) => {
    return dateString ? new Date(dateString).getFullYear() : "TBA"
  }

  if (isLoading) {
    return <MovieViewSkeleton count={12} />
  }
  console.log(data);
  


  return (
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 md:gap-6">
        {data?.map((movie: IMovie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="group cursor-pointer bg-gray-50 dark:bg-[#161616] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="relative aspect-[2/3] overflow-hidden">
              <img
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={getImageSrc(movie) || "/placeholder.svg"}
                alt={movie.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <StarFilled style={{ color: "#fbbf24", fontSize: "10px" }} />
                {formatRating(movie.vote_average)}
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center shadow-lg">
                  <PlayCircleOutlined className="text-white text-xl" />
                </div>
              </div>

              <div className="absolute inset-0 ring-1 ring-black/10 dark:ring-white/10 rounded-t-xl" />
            </div>

            <div className="p-4 space-y-2">
              <h3
                title={movie.title}
                className="text-sm md:text-base font-semibold text-gray-900 dark:text-white h-[40px] line-clamp-2 group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors leading-tight"
              >
                {movie.title}
              </h3>

              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <CalendarOutlined />
                  <span>{getYear(movie.release_date)}</span>
                </div>

                <div className="flex items-center gap-1">
                  <StarFilled style={{ color: "#fbbf24", fontSize: "10px" }} />
                  <span className="font-medium">{formatRating(movie.vote_average)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(MovieView)
