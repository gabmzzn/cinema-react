import css from './Header.module.scss'
import StarIcon from '@mui/icons-material/Star'

export const Header = (movie: any) => {
	return (
		<div className={css.header}>
			<h1>{movie.title} ({movie.release_date.split('-')[0]})</h1>
			<h1 style={{ display: 'flex', alignItems: 'center' }}>
				<StarIcon sx={{ color: 'darkorange', fontSize: '1.02em' }} />
				{movie.vote_average === 0 ? '?' : movie.vote_average}
			</h1>
		</div>
	)
}