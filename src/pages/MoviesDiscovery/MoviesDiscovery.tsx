import css from './MoviesDiscovery.module.scss'
import { useEffect, useState, useCallback } from 'react'
import { Movie } from '../../components/Movie/Movie'
import BasicRating from '../../components/Layout/Rating/Rating'
import { Outlet, Link } from "react-router-dom"

const apiKey = process.env.REACT_APP_API_KEY

interface Movies {
	id: number,
	title: string,
	overview: string,
	poster_path: string,
	vote_average: number
}

export const MoviesDiscovery = () => {

	const [movies, setMovies] = useState<Movies[] | undefined>()
	const [page, setPage] = useState(1)
	const [rating, setRating] = useState<number | null>(null)
	const [query, setQuery] = useState('')

	const fetchMovies = useCallback(async () => {
		const movies = await fetch(`
		https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}
		&include_adult=false
		&page=${page}
		${rating ? `
		&sort_by=vote_count.desc
		&vote_average.gte=${rating * 2 - 2}
		&vote_average.lte=${rating * 2}`
				: `&sort_by=popularity.desc`}
		`)
			.then(r => r.json())

		setMovies(movies.results)
	}, [rating, page])

	useEffect(() => { fetchMovies() }, [fetchMovies])

	useEffect(() => {
		query === '' && fetchMovies()
	}, [query, fetchMovies])

	async function searchMovies() {
		const movies = await fetch(`
			https://api.themoviedb.org/3/search/movie?api_key=${apiKey}
			&include_adult=false
			&language=en-US
			&query=${query}
			&page=1
			`).then(m => m.json())
		setMovies(movies.results)
	}

	return (
		<div>
			<div className={css.rating}>
				<input
					onKeyPress={e => e.key === 'Enter' && searchMovies()}
					onChange={e => setQuery(e.target.value)}
				/>
				<button onClick={() => searchMovies()}>Search</button>

				<h2>Rating</h2>
				<BasicRating
					value={rating}
					handleChange={(e: number, value: number) => setRating(value)}
				/>
			</div>
			<div className={css.main}>
				{movies ?
					movies.map(m =>
						<Link
							to={`movie/${m.id}/${m.title}`}
							key={m.id}
						>
							<Movie
								title={m.title}
								overview={m.overview}
								poster={m.poster_path}
								rating={m.vote_average}
							/>
						</Link>
					) : <h1>Loading</h1>}
			</div>
			<Outlet />
		</div>
	)
}