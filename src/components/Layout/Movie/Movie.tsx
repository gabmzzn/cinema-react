import { Link } from 'react-router-dom'
import { MovieDetail, MovieDiscover, MovieSearch } from '../../../interfaces/Movie'
import css from './Movie.module.scss'

interface MovieProps {
	movie: MovieSearch | MovieDiscover | MovieDetail
}

export const Movie = ({ movie }: MovieProps) => {

	const poster = movie.poster_path ?
		`https://image.tmdb.org/t/p/w300${movie.poster_path}` :
		'/images/movie_thumbnail.svg'

	const movieLink = `../movie/${movie.id}-${movie.title.replaceAll(' ', '-').toLowerCase()}`

	return (
		<Link to={movieLink}>
			<div className={css.movie}>
				<img src={poster} alt={movie.title} />
			</div>
		</Link>)
}