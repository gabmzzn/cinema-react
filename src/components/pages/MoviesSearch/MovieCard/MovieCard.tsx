import css from './MovieCard.module.scss'
import { MovieDiscover } from '../../../../interfaces/Movie'
import { Link } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star'

export const MovieCard = ({ movie }: { movie: MovieDiscover }) => {

	const { poster_path, title, overview,
		vote_average, release_date, backdrop_path } = movie

	const poster = poster_path ?
		`https://image.tmdb.org/t/p/w200${poster_path}` :
		'/images/movie_thumbnail.svg'

	const backdrop = backdrop_path ?
		`https://image.tmdb.org/t/p/w200${backdrop_path}` :
		'/images/movie_thumbnail.svg'

	const year = release_date?.split('-')[0]

	const vote = vote_average == 0 ? '' : vote_average

	return (
		<div className={css.movie} style={{ backgroundImage: `url(${backdrop})` }}>
			<Link
				to={`../movie/${movie.id}-${movie.title.replaceAll(' ', '-').toLowerCase()}`}
				key={movie.id}
			>
				<div className={css.backdrop}>
					<img
						src={poster}
						alt={title} />
					<div style={{ paddingRight: '10px' }}>

						<div className={css.header}>
							<h3>{title} ({year})</h3><h3 className={css.vote}><StarIcon fontSize='medium' sx={{ color: 'darkorange' }} /> {vote}</h3>
						</div>
						<span>{overview?.substr(0, 200)} [...]</span>
					</div >
				</div>
			</Link >
		</div >
	)
}