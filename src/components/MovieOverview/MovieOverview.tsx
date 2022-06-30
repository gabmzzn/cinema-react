import css from './MovieOverview.module.scss'
import { MovieSearch } from '../../interfaces/Movie'
import { Link } from 'react-router-dom'

export const MovieOverview = ({ movie }: { movie: MovieSearch }) => {

	const { poster_path, title, overview,
		vote_average, release_date, backdrop_path } = movie

	const poster = poster_path ?
		`https://image.tmdb.org/t/p/w500${poster_path}` :
		'/images/movie_thumbnail.svg'

	// const backdrop = backdrop_path ?
	// 	`https://image.tmdb.org/t/p/w500${backdrop_path}` :
	// 	'/images/movie_thumbnail.svg'

	const year = release_date?.split('-')[0]

	return (
		<div className={css.movie}>
			<Link
				to={`../movie/${movie.id}-${movie.title.replaceAll(' ', '-').toLowerCase()}`}
				key={movie.id}
			>
				<img
					src={poster}
					alt={title} /></Link>
			<div>
				<Link
					to={`../movie/${movie.id}-${movie.title.replaceAll(' ', '-').toLowerCase()}`}
					key={movie.id}
				>
					<h3>{title} ({year})</h3>
				</Link>
				<h5>{overview}</h5>
				<h3>{vote_average}</h3>
			</div>
			{/* <img src={backdrop} /> */}
		</div>
	)
}