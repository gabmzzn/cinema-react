import { useCallback, useState, useEffect } from "react"
import { Link, Outlet, useParams } from "react-router-dom"
import { Movie } from "../../components/Movie/Movie"
import css from './MoviesSearch.module.scss'

interface Movies {
	id: number,
	title: string,
	overview: string,
	poster_path: string,
	vote_average: number
}

const apiKey = process.env.REACT_APP_API_KEY

export const MoviesSearch = () => {

	const [rating, setRating] = useState<number | null>(null)
	const [page, setPage] = useState(1)

	let params = useParams()

	const [movies, setMovies] = useState<Movies[] | undefined>()

	useEffect(() => {
		async function searchMovies() {
			const movies = await fetch(`
			https://api.themoviedb.org/3/search/movie?api_key=${apiKey}
			&include_adult=false
			&query=${params.id}
			&page=1
			`).then(movie => movie.json())
			setMovies(movies.results)
		}
		searchMovies()
	}, [params.id])

	return (
		<>
			<h1>Movie Search 🔍</h1>
			<div className={css.main}>
				{movies ?
					movies.map(movie =>
						<Link
							to={`../movie/${movie.id}-${movie.title.replaceAll(' ', '-').toLowerCase()}`}
							key={movie.id}
						>
							<Movie movie={movie} />
						</Link>
					) : <h1>Loading</h1>}
				{movies?.length == 0 && <h1>No movies found</h1>}
			</div>
			<Outlet />
		</>
	)
}