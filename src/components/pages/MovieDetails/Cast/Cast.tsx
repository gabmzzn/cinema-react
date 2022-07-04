import { MovieActor } from '../../../../interfaces/Movie'
import css from './Cast.module.scss'


export const Cast = ({ cast }: { cast: MovieActor[] }) => {

	return (<>
		<h1>Cast</h1>
		<div className={css.cast}>
			{cast.map((act: MovieActor, i: number) => {
				const img = act.profile_path ?
					`https://image.tmdb.org/t/p/w154${act.profile_path}` :
					'/images/thumbnail.png'
				return (
					<div className={css.act} key={i}>
						<div>
							<img src={img} alt={act.name} width={'130px'} />
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