import { Link } from 'react-router-dom'
import css from './Movie.module.scss'

export interface MovieProps {
	title: string,
	overview: string,
	poster: string,
	rating: number
}

export const Movie = ({ movie }: any) => {

	const poster = movie.poster_path ?
		`https://image.tmdb.org/t/p/w300${movie.poster_path}` :
		'/images/movie_thumbnail.svg'

	return (
		<Link
			to={`../movie/${movie.id}-${movie.title.replaceAll(' ', '-').toLowerCase()}`}
		>
			<div className={css.movie}>
				{/* <h3>{title}</h3> */}
				<img
					src={poster}
					alt={movie.title} />
				{/* <p>{overview}</p> */}
				{/* <h2><b>{rating}</b></h2> */}
			</div>
		</Link>
	)
}