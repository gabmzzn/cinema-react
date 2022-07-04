import css from './Header.module.scss'
import StarIcon from '@mui/icons-material/Star'

interface HeaderProps {
	title: string
	release_date: string
	vote_average: number
}

export const Header = ({ title, release_date, vote_average }: HeaderProps) => {

	return (
		<div className={css.header}>
			<h1>{title} ({release_date.split('-')[0]})</h1>
			<h1 style={{ display: 'flex', alignItems: 'center' }}>
				<StarIcon
					sx={{
						color: 'darkorange',
						fontSize: '1.02em',
						marginRight: '5px'
					}}
				/>
				{vote_average === 0 ? '?' : vote_average}
			</h1>
		</div>
	)
}