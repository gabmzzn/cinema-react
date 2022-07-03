import { MovieDetail } from '../../../../interfaces/Movie'
import css from './Cast.module.scss'

export const Cast = ({ movie }: { movie: MovieDetail }) => {

	return (<>
		<h1>Cast</h1>
		<div className={css.cast}>
			{movie.credits.cast.map((act: any, i: number) => {
				const img = act.profile_path ?
					`https://image.tmdb.org/t/p/w154${act.profile_path}` :
					'/images/movie_thumbnail.svg'
				return (
					<div className={css.act} key={i}>
						<div>
							<img src={img} width={'130px'} />
							<p>{act.name}</p>
							<p style={{ opacity: '50%' }}>{act.character}</p>
						</div>
					</div>
				)
			}
			)}
		</div>
	</>)
}