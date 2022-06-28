import css from './Movie.module.scss'

export interface MovieProps {
	id: number,
	title: string,
	overview: string,
	poster_path: string,
	vote_average: number
}

export const Movie = ({ id, title, overview, poster_path, vote_average }: MovieProps) => {
	return (
		<div key={id} style={{ width: '400px' }}>
			<h3>{title}</h3>
			<img
				src={`https://image.tmdb.org/t/p/original/${poster_path}`}
				height={'250px'}
				alt={title} />
			<p>{overview}</p>
			<h2><b>{vote_average}</b></h2>
		</div>
	)
}