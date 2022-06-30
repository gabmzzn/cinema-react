import { useState, useEffect } from "react"
import MovieRating from "../../Layout/MovieRating/MovieRating"
import { Movie } from "../../Movie/Movie"
import { MovieOverview } from "../../MovieOverview/MovieOverview"
import css from './MoviesSearch.module.scss'
import Pagination from '@mui/material/Pagination'
import { useNavigate, Outlet, useParams } from 'react-router-dom'

interface Movie {
	id: number
	title: string
	overview: string
	poster_path: string
	popularity: number
	vote_average: number
	vote_count: number
}

const apiKey = process.env.REACT_APP_API_KEY

export const MoviesSearch = () => {

	let params = useParams()
	let navigate = useNavigate()

	const [fetchedMovies, setFetchedMovies] = useState<Movie[] | undefined>()
	const [movies, setMovies] = useState<Movie[] | undefined>()
	const [totalPages, setTotalPages] = useState<number>()

	useEffect(() => {
		async function searchMovies() {
			const movies = await fetch(`
			https://api.themoviedb.org/3/search/movie?api_key=${apiKey}
			&include_adult=false
			&query=${params.query}
			&page=${params.page}
			`).then(r => r.json())
			const sortedMovies = movies.results
				.sort((a: Movie, b: Movie) =>
					b.vote_count - a.vote_count
				)
			setMovies(sortedMovies)
			setFetchedMovies(sortedMovies)
			setTotalPages(movies.total_pages)
		}
		searchMovies()
	}, [params.query, params.page])

	const [rating, setRating] = useState<number | null>(null)

	useEffect(() => {
		if (rating) {
			const moviesByRating = fetchedMovies?.filter(movie =>
				movie.vote_average >= rating * 2 - 2 &&
				movie.vote_average <= rating * 2
			)
			setMovies(moviesByRating)
		} else {
			setMovies(fetchedMovies)
		}
	}, [rating])

	const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
		navigate(`/search/${params.query}/${page}`)
		setRating(null)
	}

	return (
		<>
			<div className={css.header}>
				<h1>Movie Search 🔍</h1>
				<MovieRating
					value={rating}
					handleChange={(e: number, value: number) => setRating(value)}
				/>
			</div>
			<div className={css.main}>
				{movies && params.page ?
					<>
						{movies.map(movie =>
							<MovieOverview movie={movie} />
						)}
						<div className={css.pagination}>
							<Pagination siblingCount={3} size='large' count={totalPages} page={parseInt(params.page)} onChange={handlePageChange} />
						</div>
					</>
					: <h1>Loading</h1>}
				{movies?.length == 0 && <h1>No movies found</h1>}
			</div>
			<Outlet />
		</>
	)
}