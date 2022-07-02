import css from './MoviesDiscovery.module.scss'
import { useEffect, useState, useCallback } from 'react'
import { Movie } from '../../Movie/Movie'
import { Outlet, Link } from "react-router-dom"
import { LoadingScreen } from '../../Layout/LoadingScreen/LoadingScreen'

const apiKey = process.env.REACT_APP_API_KEY

interface Movie {
	id: number,
	title: string,
	overview: string,
	poster_path: string,
	vote_average: number
	backdrop_path?: string | null
}

interface Movies {
	trending: Movie[],
	latest: Movie[]
}

export const MoviesDiscovery = () => {


	const [movies, setMovies] = useState<Movies>()

	const [popular, setPopular] = useState<any>()
	const [latest, setLatest] = useState<any>()

	const [loadingPop, setLoadingPop] = useState(false)
	const [loadingLast, setLoadingLast] = useState(false)

	useEffect(() => {
		async function fetchPopularMovies() {
			const popular = await fetch(`
		https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}
		&sort_by=popularity.desc
		&include_adult=false
		&page=1
		`).then(r => r.json())
			setPopular(popular)
			setLoadingPop(true)
		}
		async function fetchLatestMovies() {
			const latest = await fetch(`
		https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}
		&sort_by=release_date.desc&vote_count.gte=200
		&include_adult=false
		&page=1
		`).then(r => r.json())
			setLatest(latest)
			setLoadingLast(true)
		}
		fetchPopularMovies()
		fetchLatestMovies()
	}, [])

	useEffect(() => {
		if (loadingPop && loadingLast) {
			setMovies({
				trending: popular.results.slice(0, 11),
				latest: latest.results.slice(0, 10)
			})
		}
	}, [loadingPop, loadingLast])

	if (movies) {
		return (<div className={css.discovery}>
			<div className={css.topPopular}>
				<div className={css.topPoster}>
					<Movie movie={movies?.trending[0]} />
				</div>
				<div className={css.titles}>
					<h1>Top #1 popular movie right now 🔥</h1>
					<h1 className={css.title}>{movies?.trending[0].title}</h1>
				</div>
				<div className={css.backdrops} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movies?.trending[0].backdrop_path})` }}>
				</div>
			</div>
			<Link to={'popular/1'}>
				<h1>Most Popular Movies of the moment🍿</h1>
			</Link>
			<div className={css.main}>
				{movies?.trending.slice(1, 20).map((movie: Movie) => <Movie key={movie.id} movie={movie} />)}
			</div>
			<Link to={'latest/1'}>
				<h1>Latest Releases of the month🍿</h1>
			</Link>
			<div className={css.main}>
				{movies?.latest.map((movie: Movie) => <Movie key={movie.id} movie={movie} />)}
			</div>
			<Outlet />
		</div>)
	}

	return <LoadingScreen />
}