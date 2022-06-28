import css from './MoviesDiscovery.module.scss'
import { useEffect, useState } from 'react'
import { Movie, MovieProps } from '../Movie/Movie'

const apiKey = process.env.REACT_APP_API_KEY

interface Movies {
	results: [MovieProps]
}

export const MoviesDiscovery = () => {

	const [movies, setMovies] = useState<Movies>()

	useEffect(() => {
		async function fetchMovies() {
			const movies = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`).then(m => m.json())
			setMovies(movies)
		}
		fetchMovies()
	}, [])

	if (movies) {
		return (
			<div className={css.main}>
				{movies.results.map((m) =>
					<Movie
						id={m.id}
						title={m.title}
						overview={m.overview}
						poster_path={m.poster_path}
						vote_average={m.vote_average}
					/>
				)}
			</div>
		)
	}

	return (
		<div>
			<h1>Loading...</h1>
		</div>
	)
}