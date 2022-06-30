import css from './MoviesDiscovery.module.scss'
import { useEffect, useState, useCallback } from 'react'
import { Movie } from '../../Movie/Movie'
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
	const [popular, setPopular] = useState<any>()
	const [latest, setLatest] = useState<any>()
	const [loading, setLoading] = useState<number>(0)

	useEffect(() => {
		async function fetchPopularMovies() {
			const popular = await fetch(`
		https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}
		&sort_by=popularity.desc
		&include_adult=false
		&page=1
		`).then(r => r.json())
			setPopular(popular)
			setLoading(n => n + 1)
		}
		fetchPopularMovies()
	}, [])

	useEffect(() => {
		async function fetchLatestMovies() {
			const latest = await fetch(`
		https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}
		&sort_by=release_date.desc&vote_count.gte=200
		&include_adult=false
		&page=1
		`).then(r => r.json())
			setLatest(latest)
			setLoading(n => n + 1)
		}
		fetchLatestMovies()
	}, [])

	useEffect(() => {
		if (loading >= 2) {
			setMovies({
				trending: popular.results.slice(0, 8),
				latest: latest.results.slice(0, 4)
			})
		}
	}, [loading])


	return (
		<>
			<Link to={'popular/1'}>
				<h1>Popular Right Now 🔥</h1>
			</Link>
			<div className={css.main}>
				{movies &&
					movies.trending.map((movie: any) =>
						<Link
							to={`../movie/${movie.id}-${movie.title.replaceAll(' ', '-').toLowerCase()}`}
							key={movie.id}
						>
							<Movie movie={movie} />
						</Link>
					)}
			</div>
			<Link to={'latest/1'}>
				<h1>Latest Releases🍿</h1>
			</Link>
			<div className={css.main}>
				{movies &&
					movies.latest.map((movie: any) =>
						<Link
							to={`../movie/${movie.id}-${movie.title.replaceAll(' ', '-').toLowerCase()}`}
							key={movie.id}
						>
							<Movie movie={movie} />
						</Link>
					)}
			</div>
			<Outlet />
		</>
	)
}