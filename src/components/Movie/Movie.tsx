import css from './Movie.module.scss'

export interface MovieProps {
	title: string,
	overview: string,
	poster: string,
	rating: number
}

export const Movie = ({ title, overview, poster, rating }: MovieProps) => {
	return (
		<div className={css.movie}>
			<h3>{title}</h3>
			<img
				src={`https://image.tmdb.org/t/p/w200${poster}`}
				height={'250px'}
				alt={title} />
			{/* <p>{overview}</p> */}
			<h2><b>{rating}</b></h2>
		</div>
	)
}