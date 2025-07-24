"use client"

import { useMovie } from "@/api/hooks/useMovie"
import MovieView from "@/components/movie-view/MovieView"
import React, { useEffect, useState } from "react"
import { Pagination, Button, Empty } from "antd"
import { useGenre } from "@/api/hooks/useGenre"
import Genre from "@/components/genre/Genre"
import { useParamsHook } from "@/hooks/useParamsHook"
import {
  SearchOutlined,
  CalendarOutlined,
  StarOutlined,
  FireOutlined,
  TrophyOutlined,
} from "@ant-design/icons"
import Loading from "@/components/loading/Loading"


const Movies = () => {
  useEffect(() => {
    window.scrollTo(0, 70)
  }, [])
  const { getMovies } = useMovie()
  const { getGenres } = useGenre()
  const { getParam, setParam } = useParamsHook()

  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popularity.desc")

  const genre = getParam("genre")
  const page = Number(getParam("page")) || 1
  const year = getParam("year")
  const rating = getParam("rating")

  const handlePagination = (value: number) => {
    setParam("page", value.toString())
    window.scrollTo({ top: 70, behavior: "smooth" })
  }

  const clearFilters = () => {
    setParam("genre", "")
    setParam("year", "")
    setParam("rating", "")
    setParam("sort_by", "")
    setParam("page", "1")
    setSortBy("popularity.desc")
  }

  const { data: genreData } = getGenres()
  const { data, isLoading } = getMovies({
    page,
    with_genres: genre,
    without_genres: "18,36,27,10749",
    sort_by: sortBy,
    primary_release_year: year,
    "vote_average.gte": rating,
  })

  const quickFilters = [
    { key: "popular", label: "Popular", icon: <FireOutlined />, params: { sort_by: "popularity.desc" } },
    { key: "top_rated", label: "Top Rated", icon: <TrophyOutlined />, params: { sort_by: "vote_average.desc" } },
    { key: "latest", label: "Latest", icon: <CalendarOutlined />, params: { sort_by: "release_date.desc" } },
    { key: "trending", label: "Trending", icon: <StarOutlined />, params: { sort_by: "vote_count.desc" } },
  ]


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black ">
      <div
        className="relative py-16 px-6 h-[500px] grid place-items-center"
        style={{
          background: "linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%)",
        }}
      >
        <div className="container mx-auto text-center ">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Discover Movies</h1>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Explore thousands of movies from every genre, decade, and rating. Find your next favorite film.
          </p>

          <div className="max-w-2xl mx-auto relative">
            {/* */}
            <form action="" style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "12px",
              color: "white",
              fontSize: "16px",
              height: "56px",
              display: "flex",
              alignItems: "center",
              paddingLeft: 8
            }}>
              <SearchOutlined style={{ paddingRight: 10 }} />
              <input
                placeholder="Search for movies, actors, directors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=" bg-transparent h-full flex-1/2 outline-none text-white"
              />
            </form>
          </div>
        </div>
      </div>

      <div className="py-6 dark:bg-[#161616] bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {quickFilters.map((filter) => (
              <Button
                key={filter.key}
                size="large"
                onClick={() => {
                  Object.entries(filter.params).forEach(([key, value]) => {
                    setParam(key, value)
                  })
                  setParam("page", "1")
                  setSortBy(filter.params.sort_by || "popularity.desc")
                }}
                style={{
                  backgroundColor: sortBy === filter.params.sort_by ? "#b91c1c" : "transparent",
                  borderColor: "#b91c1c",
                  color: sortBy === filter.params.sort_by ? "white" : "#b91c1c",
                  borderRadius: "24px",
                  height: "40px",
                  fontWeight: "500",
                }}
              >
                {filter.icon}
                <span className="ml-2">{filter.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="w-full lg:flex-1">
              <Genre data={genreData?.genres} />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
            </div>
          </div>


        </div>

        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {data?.total_results ? `${data.total_results.toLocaleString()} Movies Found` : "Movies"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Page {page} of {Math.ceil((data?.total_results || 0) / 20)}
            </p>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loading />
          </div>
        )}

        {!isLoading && data?.results && data.results.length > 0 ? (
          <div >
            <MovieView data={data.results} />
          </div>
        ) : !isLoading ? (
          <div className="py-20">
            <Empty style={{ color: "white" }}>
              <Button
                type="primary"
                onClick={clearFilters}
                style={{
                  backgroundColor: "#b91c1c",
                  borderColor: "#b91c1c",
                  cursor: "pointer",
                }}
              >
                Clear Filters
              </Button>
            </Empty>
          </div>
        ) : null}
      {
        // data?.results.
      }
        {data?.results && data.results.length > 0 && (
          <div className="flex justify-center">
            <div className="p-6 rounded-2xl" style={{ backgroundColor: "#161616" }}>
              <Pagination
                current={page}
                pageSize={20}
                onChange={handlePagination}
                total={data?.total_results <= 10000 ? data?.total_results : 10000}
                showSizeChanger={false}
                showQuickJumper
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} movies`}
                style={{
                  color: "white",
                }}
              />
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default React.memo(Movies)
