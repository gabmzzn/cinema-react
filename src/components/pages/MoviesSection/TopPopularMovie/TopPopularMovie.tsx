import css from './TopPopularMovie.module.scss'
import { Movie } from '../../../Movie/Movie'
import { MovieDiscover } from '../../../../interfaces/Movie'

export const TopPopularMovie = ({ movie }: { movie: MovieDiscover }) => {
	return (
		<div className={css.topPopular}>
			<div className={css.topPoster}>
				<Movie movie={movie} />
			</div>
			<div className={css.titles}>
				<h1>Top #1 popular movie right now 🔥</h1>
				<h1 className={css.title}>{movie.title}</h1>
			</div>
			<div className={css.backdrops} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}>
			</div>
		</div>)
}