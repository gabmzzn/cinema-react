import css from './MovieOverview.module.scss'
import { MovieSearch } from '../../interfaces/Movie'

export const MovieOverview = ({ movie }: { movie: MovieSearch }) => {

	const { poster_path, title, overview,
		vote_average, release_date } = movie

	const poster = poster_path ?
		`https://image.tmdb.org/t/p/w500${poster_path}` :
		'/images/movie_thumbnail.svg'

	const year = release_date?.split('-')[0]

	return (
		<div className={css.movie}>
			<img
				src={poster}
				alt={title} />
			<div>
				<h3>{title} ({year})</h3>
				<h5>{overview}</h5>
				<h3>{vote_average}</h3>
			</div>
		</div>
	)
}