import React, { useEffect } from 'react';
import { useMovie } from '@/api/hooks/useMovie'
import { Link } from 'react-router-dom';
import type { IMovie } from '@/types';
import MovieView from '@/components/movie-view/MovieView'
// TEGMA TEPADILAGA

import './style.css';

import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { IMAGE_URL } from '@/const';
import { StarFilled } from '@ant-design/icons';

const Home = () => {
  const { getMovies } = useMovie()
  const { data } = getMovies({ page: 1, without_genres: "18,36,27,10749" })
  console.log(data);
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <>
      <div className=' h-[780px] mb-[50px] relative'>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {
            data?.results?.map((movie: IMovie) => (
              <SwiperSlide className="relative">
                <img className='object-cover w-full h-full ' src={IMAGE_URL + movie?.backdrop_path} alt="" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10 rounded-[8px]"></div>

                <div className='absolute bottom-24 left-12 z-20'>
                  <p className='text-[56px] font-extrabold text-white drop-shadow-lg'>{movie?.title}</p>
                  <div className='flex gap-3 items-center text-slate-300 font-medium drop-shadow-md'>
                    <span>{movie?.release_date.split("-")[0]}</span>
                    <span className='w-[3px] h-[3px] bg-slate-300 rounded-full'></span>
                    <span><StarFilled style={{color: "yellow", marginRight: 6}}></StarFilled>{movie?.vote_average}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
      <div className='container mx-auto flex justify-between text-[20px] mb-[20px]'>
        <p className=''>New Release</p>
        <p className='text-red-700'><Link to={"/movies"}>See all{'>'}</Link></p>
      </div>
      <MovieView data={data?.results?.slice(0, 12)} />
    </>
  )
}

export default React.memo(Home)