import MovieView from '@/components/movie-view/MovieView'
import type { RootState } from '@/lib/store'
import { useSelector } from 'react-redux'

const Saved = () => {
  const wishlist = useSelector((state: RootState) => state.wishlistSlice.value)
  
  return (
    <div>
      {
        <MovieView data={wishlist} />
      }
    </div>
  )
}

export default Saved