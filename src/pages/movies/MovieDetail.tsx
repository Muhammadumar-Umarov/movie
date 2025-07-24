"use client"

import { useMovie } from "@/api/hooks/useMovie"
import MovieView from "@/components/movie-view/MovieView"
import { IMAGE_URL } from "@/const"
import { Button, Image, Tag, Progress } from "antd"
import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import dfImage from "@/assets/default_image.avif"
import {
  CalendarOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
  ArrowLeftOutlined,
  ShareAltOutlined,
  HeartOutlined,
  BookOutlined,
  GlobalOutlined,
} from "@ant-design/icons"

const MovieDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const navigate = useNavigate()
  const { id } = useParams()
  const { getMovieSingle, getMovieDetail } = useMovie()
  const { data } = getMovieSingle(id || "")
  const { data: similarData } = getMovieDetail(id || "", "similar")
  const { data: creditsData } = getMovieDetail(id || "", "credits")

  const ratingPercentage = data?.vote_average ? data.vote_average * 10 : 0
console.log(data);

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-black" style={{ paddingTop: "70px" }}>
        <div className="relative h-[70vh] overflow-hidden ">
          <div className="absolute inset-0">
            <img 
              src={IMAGE_URL + data?.backdrop_path}
              alt={data?.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
            <Button
              onClick={() => navigate(-1)}
              type="text"
              size="large"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                backdropFilter: "blur(8px)",
                color: "white",
                border: "0",
                borderRadius: "8px",
              }}
            >
              <ArrowLeftOutlined />
            </Button>

            <div className="flex gap-3">
              <Button
                type="text"
                size="large"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  backdropFilter: "blur(8px)",
                  color: "white",
                  border: "0",
                  borderRadius: "8px",
                }}
              >
                <ShareAltOutlined />
              </Button>
              <Button
                type="text"
                size="large"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  backdropFilter: "blur(8px)",
                  color: "white",
                  border: "0",
                  borderRadius: "8px",
                }}
              >
                <HeartOutlined />
              </Button>
              <Button
                type="text"
                size="large"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  backdropFilter: "blur(8px)",
                  color: "white",
                  border: "0",
                  borderRadius: "8px",
                }}
              >
                <BookOutlined />
              </Button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-4">
                {data?.genres?.map((genre: any) => (
                  <Tag
                    key={genre.id}
                    style={{
                      backgroundColor: "rgba(185, 28, 28, 0.2)",
                      borderColor: "#b91c1c",
                      color: "#fca5a5",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {genre.name}
                  </Tag>
                ))}
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">{data?.title}</h1>

              <div className="flex flex-wrap items-center gap-6 mb-6 text-white/90">
                <div className="flex items-center gap-2">
                  <div className="relative w-16 h-16">
                    <Progress
                      type="circle"
                      percent={ratingPercentage}
                      size={64}
                      strokeColor={{
                        "0%": "#ef4444",
                        "100%": "#dc2626",
                      }}
                      trailColor="rgba(255,255,255,0.2)"
                      strokeWidth={8}
                      format={() => (
                        <span style={{ color: "white", fontWeight: "bold", fontSize: "14px" }}>
                          {data?.vote_average?.toFixed(1)}
                        </span>
                      )}
                    />
                  </div>
                  <span className="text-sm">User Score</span>
                </div>

                <div className="flex items-center gap-1">
                  <CalendarOutlined />
                  <span>{data?.release_date?.slice(0, 4)}</span>
                </div>

                <div className="flex items-center gap-1">
                  <ClockCircleOutlined />
                  <span>{data?.runtime} min</span>
                </div>

                <div className="flex items-center gap-1">
                  <GlobalOutlined />
                  <span>{data?.original_language?.toUpperCase()}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="large"
                  style={{
                    backgroundColor: "#b91c1c",
                    borderColor: "#b91c1c",
                    color: "white",
                    fontWeight: "600",
                    padding: "0 32px",
                    height: "48px",
                    borderRadius: "8px",
                  }}
                >
                  <PlayCircleOutlined className="mr-2" />
                  Watch Trailer
                </Button>

                <Button
                  size="large"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(8px)",
                    borderColor: "transparent",
                    color: "white",
                    fontWeight: "600",
                    padding: "0 32px",
                    height: "48px",
                    borderRadius: "8px",
                  }}
                >
                  <BookOutlined className="mr-2" />
                  Add to Watchlist
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
            <div className="xl:col-span-1">
              <div className="sticky top-8 space-y-6" style={{ top: "90px" }}>
                <div className="relative group">
                  <div
                    className="aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl"
                    style={{ backgroundColor: "#161616" }}
                  >
                    <Image
                      src={IMAGE_URL + data?.poster_path}
                      alt={data?.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      preview={false}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10 dark:ring-white/10" />
                </div>

                <div className="rounded-2xl p-6 shadow-lg dark:bg-[#161616]">
                  <h3 className="text-lg font-semibold dark:text-white  mb-4">Movie Facts</h3>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status</span>
                      <span className="font-medium dark:text-white">{data?.status}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Budget</span>
                      <span className="font-medium dark:text-white">
                        {data?.budget ? `$${(data.budget / 1000000).toFixed(1)}M` : "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Revenue</span>
                      <span className="font-medium dark:text-white">
                        {data?.revenue ? `$${(data.revenue / 1000000).toFixed(1)}M` : "N/A"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Vote Count</span>
                      <span className="font-medium dark:text-white">{data?.vote_count?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:col-span-3 space-y-12">
              <div className="rounded-2xl p-8 shadow-lg bg-white dark:bg-[#161616]">
                <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Overview</h2>
                <p className="dark:text-gray-300 text-gray-700 leading-relaxed text-lg">{data?.overview}</p>

                {data?.tagline && (
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <blockquote className="text-red-400 font-medium italic text-lg">"{data.tagline}"</blockquote>
                  </div>
                )}
              </div>

              <div className="rounded-2xl p-8 shadow-lg dark:bg-[#161616]">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold dark:text-white text-black">Cast</h2>
                  <Button
                    type="link"
                    onClick={() => navigate(`/movie/${id}/cast`)}
                    style={{
                      color: "#b91c1c",
                      padding: "0",
                      fontSize: "16px",
                    }}
                  >
                    View All Cast →
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {creditsData?.cast?.slice(0, 12).map((person: any) => (
                    <div
                      key={person.id}
                      onClick={() => navigate(`/person/${person.id}`)}
                      className="group cursor-pointer"
                    >
                      <div className="relative mb-3">
                        <div
                          className="aspect-square rounded-full overflow-hidden shadow-md"
                          style={{ backgroundColor: "#161616" }}
                        >
                          <img
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            src={person?.profile_path ? IMAGE_URL + person.profile_path : dfImage}
                            alt={person.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                        <div className="absolute inset-0 rounded-full ring-1 ring-white/10" />
                      </div>

                      <div className="text-center space-y-1">
                        <h3 className="font-semibold dark:text-white text-black text-sm group-hover:text-red-400 transition-colors line-clamp-2">
                          {person.original_name}
                        </h3>
                        <p className="text-gray-400 text-xs line-clamp-2">{person.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {data?.production_companies && data.production_companies.length > 0 && (
                <div className="rounded-2xl p-8 shadow-lg ">
                  <h2 className="text-2xl font-bold dark:text-white mb-6 text-black">Production</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold dark:text-white text-gray-800 mb-4">Production Companies</h3>
                      <div className="space-y-3">
                        {data.production_companies.map((company: any) => (
                          <div key={company.id} className="flex items-center gap-3">
                            {company.logo_path && (
                              <img
                                src={IMAGE_URL + company.logo_path}
                                alt={company.name}
                                className="w-8 h-8 object-contain"
                                style={{ width: "32px", height: "32px", objectFit: "contain" }}
                              />
                            )}
                            <span className="dark:text-gray-300 text-gray-700">{company.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {data.production_countries && (
                      <div>
                        <h3 className="font-semibold text-white mb-4">Countries</h3>
                        <div className="flex flex-wrap gap-2">
                          {data.production_countries.map((country: any) => (
                            <Tag
                              key={country.iso_3166_1}
                              style={{
                                backgroundColor: "#2d2d2d",
                                color: "#e5e5e5",
                                border: "1px solid #404040",
                              }}
                            >
                              {country.name}
                            </Tag>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {similarData?.results && similarData.results.length > 0 && (
                <div className="rounded-2xl p-8 shadow-lg dark:bg-[#161616]" >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold dark:text-white">More Like This</h2>
                    <Button
                      type="link"
                      style={{
                        color: "#b91c1c",
                        padding: "0",
                        fontSize: "16px",
                      }}
                    >
                      View All →
                    </Button>
                  </div>

                  <MovieView data={similarData.results.slice(0, 4)} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(MovieDetail)
