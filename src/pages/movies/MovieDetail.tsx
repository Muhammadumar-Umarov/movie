import { useMovie } from '@/api/hooks/useMovie'
import MovieView from '@/components/movie-view/MovieView'
import { IMAGE_URL } from '@/const'
import { Button, Image } from 'antd'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dfImage from "@/assets/default_image.avif"
import { CalendarOutlined, ClockCircleOutlined, PlayCircleOutlined, StarFilled } from '@ant-design/icons'

const MovieDetail = () => {
  useEffect(()=>{
     window.scrollTo(0,0)
   },[])
  const navigate = useNavigate()
  const { id } = useParams()

  const { getMovieSingle, getMovieDetail } = useMovie()

  const { data } = getMovieSingle(id || "")
  const { data: similarData } = getMovieDetail(id || "", "similar")
  // const { data: imagesData } = getMovieDetail(id || "", "images")
  const { data: creditsData } = getMovieDetail(id || "", "credits")
  

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black">
        {/* Hero Section with Backdrop */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <Image src={IMAGE_URL + data?.backdrop_path || "/placeholder.svg"} alt={data?.title} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          <div className="absolute bottom-8 right-8 z-10">
            <Button className="bg-red-700 hover:bg-red-800 text-white">
              <PlayCircleOutlined className="mr-2" />
              Watch Trailer
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl max-w-sm mx-auto lg:max-w-none">
                  <Image src={IMAGE_URL + data?.poster_path || "/placeholder.svg"} alt={data?.title} className="object-cover" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{data?.title}</h1>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center text-yellow-500">
                    <StarFilled className="mr-1" />
                    <span className="font-semibold text-gray-900 dark:text-white">{data?.rating}/10</span>
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <CalendarOutlined className="mr-1" />
                    {data?.release_date?.slice(0, 4)}
                  </div>

                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <ClockCircleOutlined className="mr-1" />
                    {data?.runtime} min
                  </div>
                </div>

                {/* <div className="flex flex-wrap gap-2 mb-6">
                {data?.genres.map((genre: any, inx:number) => (
                  <Badge
                    key={inx}
                    className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  >
                    {genre}
                  </Badge>
                ))}
              </div> */}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Overview</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data?.overview}</p>
              </div>

              {/* Cast */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Cast</h2>
                {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data?.cast.map((actor: any) => (
                  <Link key={actor.id} to={`/person/${actor.id}`} className="group">
                    <div className="text-center">
                      <div className="relative aspect-square rounded-full overflow-hidden mb-2 mx-auto w-20 h-20 md:w-24 md:h-24">
                        <Image
                          src={
                            actor.profilePath
                              ? `https://image.tmdb.org/t/p/w185${actor.profilePath}`
                              : "/placeholder.svg?height=185&width=185"
                          }
                          alt={actor.name}
                          
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                        {actor.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">{actor.character}</p>
                    </div>
                  </Link>
                ))}
              </div> */}

                {/* ACTORS */}
                <div className='flex flex-wrap gap-x-10 gap-y-12 '>
                  {creditsData?.cast?.map((person: any) => (
                    <div onClick={() => navigate(`/person/${person.id}`)} key={person?.id} className='overflow-hidden  cursor-pointer flex flex-col items-center hover:opacity-70'>
                      <div className='mb-2 '>
                        <img className='rounded-full h-[194px] w-[194px] object-cover' src={person?.profile_path === null ? dfImage : IMAGE_URL + person?.profile_path} alt="" />
                      </div>
                      <div className='flex flex-col items-center'>
                        <h3 className='text-[20px]'>{person?.original_name}</h3>
                        <p className='text-[14px] font-light'>{person?.character}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
              <div className='w-full'>
                <MovieView data={similarData?.results?.slice(0, 4)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(MovieDetail)