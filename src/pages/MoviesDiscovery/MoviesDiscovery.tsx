import css from './MoviesDiscovery.module.scss'
import { useEffect, useState, useCallback } from 'react'
import { Movie } from '../../components/Movie/Movie'
import { Outlet, Link } from "react-router-dom"

const apiKey = process.env.REACT_APP_API_KEY

interface Movie {
	id: number,
	title: string,
	overview: string,
	poster_path: string,
	vote_average: number
}

interface Movies {
	trending: Movie[],
	latest: Movie[]
}

export const MoviesDiscovery = () => {

	const [movies, setMovies] = useState<Movies>()

	const fetchMovies = useCallback(async () => {
		const trending = await fetch(`
		https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}
		&sort_by=popularity.desc
		&include_adult=false
		&page=1
		`).then(r => r.json())
		const latest = await fetch(`
		https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}
		&sort_by=release_date.desc&vote_count.gte=200
		&include_adult=false
		&page=1
		`).then(r => r.json())
		const movies = {
			trending: trending.results.slice(0, 8),
			latest: latest.results.slice(0, 4)
		}
		setMovies(movies)
		console.log('discover')
	}, [])

	useEffect(() => { fetchMovies() }, [fetchMovies])


	return (
		<>
			<Link to={'trending'}>
				<h1>Trending Right Now 🔥</h1>
			</Link>
			<div className={css.main}>
				{movies ?
					movies.trending.map((movie: any) =>
						<Link
							to={`../movie/${movie.id}-${movie.title.replaceAll(' ', '-').toLowerCase()}`}
							key={movie.id}
						>
							<Movie movie={movie} />
						</Link>
					) : <h1>Loading</h1>}
			</div>
			<Link to={'latest'}>
				<h1>Latest Releases🍿</h1>
			</Link>
			<div className={css.main}>
				{movies ?
					movies.latest.map((movie: any) =>
						<Link
							to={`../movie/${movie.id}-${movie.title.replaceAll(' ', '-').toLowerCase()}`}
							key={movie.id}
						>
							<Movie movie={movie} />
						</Link>
					) : <h1>Loading</h1>}
			</div>
			<Outlet />
		</>
	)
}