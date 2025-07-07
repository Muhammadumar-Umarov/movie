"use client"

import { usePerson } from "@/api/hooks/usePerson"
import MovieView from "@/components/movie-view/MovieView"
import PersonSkeleton from "@/components/person-skeleton/PersonSkeleton"
import { IMAGE_URL } from "@/const"
import {
  ArrowLeftOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  StarOutlined,
  HeartOutlined,
  ShareAltOutlined,
  GlobalOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Button, Tag, Badge } from "antd"
import React, { useEffect } from "react"
import { Link, useParams } from "react-router-dom"

const PersonDetail = () => {
  const { id } = useParams()
  const { getPersonSingle, getPersonMovie } = usePerson()
  const { data: getCreditsData } = getPersonMovie(id || "", "credits")

  useEffect(() => {
    window.scrollTo(0, 70)
  }, [])

  const { data, isLoading } = getPersonSingle(id || "")

  console.log(data)

  if (isLoading) {
    return <PersonSkeleton />
  }

  const age = data?.birthday ? new Date().getFullYear() - new Date(data?.birthday).getFullYear() : null
  const deathAge =
    data?.deathday && data?.birthday
      ? new Date(data.deathday).getFullYear() - new Date(data.birthday).getFullYear()
      : null

  // Only get movies, remove TV shows
  const movies = getCreditsData?.cast?.filter((item: any) => item.media_type === "movie" || !item.media_type) || []

  // Calculate career stats
  const totalCredits = getCreditsData?.cast?.length || 0

  // Get career span
  const sortedMovies = movies.sort(
    (a: any, b: any) => new Date(a.release_date || "1900").getTime() - new Date(b.release_date || "1900").getTime(),
  )
  const careerStart = sortedMovies[0]?.release_date ? new Date(sortedMovies[0].release_date).getFullYear() : null
  const careerEnd = sortedMovies[sortedMovies.length - 1]?.release_date
    ? new Date(sortedMovies[sortedMovies.length - 1].release_date).getFullYear()
    : new Date().getFullYear()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black" style={{ paddingTop: "70px" }}>
      {/* Navigation Bar */}
      <div className="bg-gray-50 dark:bg-black py-4">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <Button
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(8px)",
                color: "#b91c1c",
                border: "1px solid #b91c1c",
                borderRadius: "8px",
              }}
            >
              <Link to="/movies" style={{ color: "#b91c1c", textDecoration: "none" }}>
                <ArrowLeftOutlined className="mr-2" />
                Back to Movies
              </Link>
            </Button>

            <div className="flex gap-3">
              <Button
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(8px)",
                  color: "#b91c1c",
                  border: "1px solid #b91c1c",
                  borderRadius: "8px",
                }}
              >
                <ShareAltOutlined />
              </Button>
              <Button
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(8px)",
                  color: "#b91c1c",
                  border: "1px solid #b91c1c",
                  borderRadius: "8px",
                }}
              >
                <HeartOutlined />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="xl:col-span-1">
            <div className="sticky top-8 space-y-6" style={{ top: "90px" }}>
              {/* Hero Section - Moved to Sidebar */}
              <div className="rounded-2xl p-6 shadow-lg" style={{ backgroundColor: "#161616" }}>
                {/* Profile Image */}
                <div className="relative group mb-6">
                  <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={IMAGE_URL + data?.profile_path || "/placeholder.svg"}
                      alt={data?.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
                </div>

                {/* Person Info */}
                <div className="text-center">
                  <div className="mb-4">
                    <Tag
                      style={{
                        backgroundColor: "rgba(185, 28, 28, 0.2)",
                        borderColor: "#b91c1c",
                        color: "#fca5a5",
                        backdropFilter: "blur(4px)",
                        fontSize: "14px",
                      }}
                    >
                      {data?.known_for_department || "Actor"}
                    </Tag>
                  </div>

                  <h1 className="text-2xl font-bold text-white mb-4">{data?.name}</h1>

                  <div className="space-y-3 text-white/90 mb-6 text-sm">
                    {data?.birthday && (
                      <div className="flex items-center justify-center gap-1">
                        <CalendarOutlined />
                        <span>
                          {new Date(data.birthday).toLocaleDateString()}
                          {age && <span className="ml-1">({age} years old)</span>}
                        </span>
                      </div>
                    )}

                    {data?.place_of_birth && (
                      <div className="flex items-center justify-center gap-1">
                        <EnvironmentOutlined />
                        <span className="text-center">{data.place_of_birth}</span>
                      </div>
                    )}

                    {data?.popularity && (
                      <div className="flex items-center justify-center gap-1">
                        <StarOutlined />
                        <span>Popularity: {data.popularity.toFixed(0)}</span>
                      </div>
                    )}
                  </div>

                  {/* Career Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-white">{totalCredits}</div>
                      <div className="text-white/70 text-xs">Credits</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{data?.popularity?.toString().slice(0, 3)}</div>
                      <div className="text-white/70 text-xs">Popularity</div>
                    </div>
                    {careerStart && (
                      <div>
                        <div className="text-lg font-bold text-white">
                          {careerStart}-{careerEnd}
                        </div>
                        <div className="text-white/70 text-xs">Career</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="rounded-2xl p-6 shadow-lg bg-gray-50 dark:bg-[#161616]">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <UserOutlined />
                  Personal Details
                </h3>

                <div className="space-y-4 text-sm">
                  {data?.birthday && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Born</span>
                      <span className="text-gray-900 dark:text-white">
                        {new Date(data.birthday).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {data?.deathday && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Died</span>
                      <span className="text-gray-900 dark:text-white">
                        {new Date(data.deathday).toLocaleDateString()}
                        {deathAge && <span className="ml-1">({deathAge} years old)</span>}
                      </span>
                    </div>
                  )}

                  {data?.place_of_birth && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400 block mb-1">Place of Birth</span>
                      <span className="text-gray-900 dark:text-white text-xs">{data.place_of_birth}</span>
                    </div>
                  )}

                  {data?.known_for_department && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Known For</span>
                      <span className="text-gray-900 dark:text-white">{data.known_for_department}</span>
                    </div>
                  )}

                  {data?.gender && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Gender</span>
                      <span className="text-gray-900 dark:text-white">{data.gender === 1 ? "Female" : "Male"}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* External Links */}
              {(data?.homepage || data?.imdb_id) && (
                <div className="rounded-2xl p-6 shadow-lg bg-gray-50 dark:bg-[#161616]">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <GlobalOutlined />
                    External Links
                  </h3>

                  <div className="space-y-3">
                    {data.homepage && (
                      <Button
                        block
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "#b91c1c",
                          color: "#b91c1c",
                        }}
                        onClick={() => window.open(data.homepage, "_blank")}
                      >
                        Official Website
                      </Button>
                    )}

                    {data.imdb_id && (
                      <Button
                        block
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "#b91c1c",
                          color: "#b91c1c",
                        }}
                        onClick={() => window.open(`https://www.imdb.com/name/${data.imdb_id}`, "_blank")}
                      >
                        IMDb Profile
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="xl:col-span-3 space-y-8">
            {/* Biography */}
            {data?.biography && (
              <div className="rounded-2xl p-8 shadow-lg bg-gray-50 dark:bg-[#161616]">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Biography</h2>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                  {data.biography.split("\n\n").map((paragraph: string, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Movies Section */}
            <div className="rounded-2xl p-8 shadow-lg bg-gray-50 dark:bg-[#161616]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  Movies
                  <Badge count={movies.length} offset={[10, 0]} style={{ backgroundColor: "#b91c1c" }} />
                </h2>
              </div>

              {movies.length > 0 ? (
                <>
                  <MovieView data={movies.slice(0, 12)} />
                  {movies.length > 12 && (
                    <div className="text-center mt-8">
                      <Button
                        size="large"
                        style={{
                          backgroundColor: "#b91c1c",
                          borderColor: "#b91c1c",
                          color: "white",
                        }}
                      >
                        View All Movies ({movies.length})
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-900 dark:text-gray-400">No movies found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(PersonDetail)
