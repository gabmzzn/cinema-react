import css from './MovieOverview.module.scss'
import { MovieSearch } from '../../interfaces/Movie'
import { Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star'

export const MovieOverview = ({ movie }: { movie: MovieSearch }) => {

	const { poster_path, title, overview,
		vote_average, release_date, backdrop_path } = movie

	const poster = poster_path ?
		`https://image.tmdb.org/t/p/w500${poster_path}` :
		'/images/movie_thumbnail.svg'

	const backdrop = backdrop_path ?
		`https://image.tmdb.org/t/p/w500${backdrop_path}` :
		'/images/movie_thumbnail.svg'

	const year = release_date?.split('-')[0]

	return (
		<div className={css.movie} style={{ backgroundImage: `url(${backdrop})` }}>
			<div className={css.backdrop}>
				<Link
					to={`../movie/${movie.id}-${movie.title.replaceAll(' ', '-').toLowerCase()}`}
					key={movie.id}
				>
					<img
						src={poster}
						alt={title} /></Link>
				<div style={{ paddingRight: '10px' }}>
					<Link
						to={`../movie/${movie.id}-${movie.title.replaceAll(' ', '-').toLowerCase()}`}
						key={movie.id}
					>
						<div className={css.header}>
							<h3>{title} ({year})</h3><h3 className={css.vote}><StarIcon fontSize='medium' sx={{ color: 'darkorange' }} /> {movie.vote_average}</h3>
						</div>
					</Link>
					<span>{overview?.substr(0, 200)} [...]</span>
				</div >
			</div>
		</div >
	)
}