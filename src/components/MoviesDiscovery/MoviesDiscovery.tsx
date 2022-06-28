import css from './MoviesDiscovery.module.scss'
import { useEffect, useState } from 'react'
import { Movie, MovieProps } from '../Movie/Movie'
import BasicRating from '../Layout/Rating/Rating'

const apiKey = process.env.REACT_APP_API_KEY

interface Movies {
	results: [{
		id: number,
		title: string,
		overview: string,
		poster_path: string,
		vote_average: number
	}]
}

export const MoviesDiscovery = () => {

	const [movies, setMovies] = useState<Movies>()

	const [rating, setRating] = useState<number | null>(null)

	function changeRating(event: number, newValue: number) {
		setRating(newValue)
	}

	useEffect(() => {
		async function fetchMovies() {
			const movies = await fetch(`
			https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}
			&include_adult=false
			&include_video=false
			&page=1
			&with_watch_monetization_types=flatrate
			${rating ? `
			&sort_by=vote_count.desc
			&vote_average.gte= ${rating * 2 - 2}
			&vote_average.lte=${rating * 2}` :
					`&sort_by=popularity.desc`}
			`).then(m => m.json())
			setMovies(movies)
		}
		fetchMovies()
	}, [rating])

	useEffect(() => {
		rating && console.log(`Menor: ${rating * 2} Mayor: ${rating * 2 - 2}`)
	}, [rating])

	if (movies) {
		return (
			<>
				<div className={css.rating}>
					<h2>Rating</h2>
					<BasicRating
						value={rating}
						handleChange={changeRating}
					/>
				</div>
				<div className={css.main}>
					{movies.results.map(m =>
						<Movie
							key={m.id}
							title={m.title}
							overview={m.overview}
							poster={m.poster_path}
							rating={m.vote_average}
						/>
					)}
				</div>
			</>

		)
	}

	return (
		<div>
			<h1>Loading...</h1>
		</div>
	)
}