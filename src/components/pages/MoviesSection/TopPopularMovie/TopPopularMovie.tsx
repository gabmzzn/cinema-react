import css from './TopPopularMovie.module.scss'
import { Movie } from '../../../Movie/Movie'
import { MovieDiscover } from '../../../../interfaces/Movie'
import Button from '@mui/material/Button/Button'
import { Link } from 'react-router-dom'
import LocalActivityIcon from '@mui/icons-material/LocalActivity'

export const TopPopularMovie = ({ movie }: { movie: MovieDiscover }) => {

	const movieLink = `../movie/${movie.id}-${movie.title.replaceAll(' ', '-').toLowerCase()}`

	return (
		<div className={css.topPopular}>
			<div className={css.topPoster}>
				<Movie movie={movie} />
			</div>
			<div className={css.titles}>
				<h1>Top #1 popular movie right now 🔥</h1>
				<Link to={movieLink}>
					<h1 className={css.title}>{movie.title}</h1>
				</Link>
				<p>
					<Link to={movieLink}>
						<Button variant="outlined"><b style={{ display: 'flex', alignItems: 'center' }}>BUY TICKES NOW <LocalActivityIcon /></b></Button>
					</Link>
				</p>
			</div>
			<div className={css.backdrops} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}>
			</div>
		</div >)
}