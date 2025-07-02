import { useMovie } from '@/api/hooks/useMovie'
import MovieView from '@/components/movie-view/MovieView'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles

import './style.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { IMAGE_URL } from '@/const';
import type { IMovie } from '@/types';

const Home = () => {
  const { getMovies } = useMovie()
  const { data } = getMovies({ page: 1, without_genres: "18,36,27,10749" })
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  console.log(data);
  
  return (
    <>
      <div className='container h-[640px] mx-auto rounded-[12px] mt-4 mb-[50px]'>
        <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          borderRadius: 12
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {
          data?.results?.map((movie: IMovie)=>(
            <SwiperSlide>
              <img src={IMAGE_URL + movie.poster_path} alt="" />
            </SwiperSlide>
          ))
        }
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper w-[432px] mx-auto h-[64px]"
      >
        {
          data?.results?.map((movie: IMovie)=>(
            <SwiperSlide>
              <img className='object-contain' src={IMAGE_URL + movie.poster_path} alt="" />
            </SwiperSlide>
          ))
        }
      </Swiper>
      </div>

      <MovieView data={data?.results?.slice(0, 10)} />
    </>
  )
}

export default React.memo(Home)