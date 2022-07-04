import css from './MoviesSection.module.scss'
import { useEffect, useState } from 'react'
import { Movie } from '../../Layout/Movie/Movie'
import { Outlet, Link, useParams, useNavigate } from "react-router-dom"
import MovieRating from '../../Layout/MovieRating/MovieRating'
import Pagination from '@mui/material/Pagination'
import { MovieSearch } from '../../../interfaces/Movie'
import { TopPopularMovie } from './TopPopularMovie/TopPopularMovie'
import { LoadingScreen } from '../../Layout/LoadingScreen/LoadingScreen'
import Button from '@mui/material/Button/Button'
const apiKey = process.env.REACT_APP_API_KEY

interface MoviesSectionProps {
	section: string
	title: string
	sortBy: string
	mini?: number
	top?: boolean
	isLoaded?: () => void
	movieId?: number
	overflow?: boolean
}

export const MoviesSection = (props: MoviesSectionProps) => {

	let params = useParams()
	let navigate = useNavigate()

	const { section, title, sortBy, mini, isLoaded, top, movieId, overflow } = props

	const [fetchedMovies, setFetchedMovies] = useState<MovieSearch[] | undefined>()
	const [movies, setMovies] = useState<MovieSearch[] | undefined>()
	const [totalPages, setTotalPages] = useState<number>()

	useEffect(() => {
		async function fetchMovies() {
			const movies = await fetch(`
		https://api.themoviedb.org/3/
		${section === 'similar' ? `movie/${movieId}/similar` : 'discover/movie'}
		?api_key=${apiKey}
		&include_adult=false
		&language=en-US
		${mini ? '' : `&page=${params.page}`}
		&sort_by=${sortBy}
		`).then(r => r.json())
			setMovies(movies.results)
			setFetchedMovies(movies.results)
			setTotalPages(movies.total_pages >= 500 ? 500 : movies.total_pages)
			isLoaded && isLoaded()
		}
		fetchMovies()
	}, [params.page, sortBy])

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
	}, [rating, fetchedMovies])

	const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
		navigate(`/discover/${section}/${page}`)
		setRating(null)
	}

	if (movies && mini) {
		return (
			<>
				{top && <TopPopularMovie movie={movies[0]} />}
				<h1 className={css.title}>
					{title}&nbsp;
					{section !== 'similar' &&
						<Link to={`${section}/1`}>
							<Button variant="outlined">View All ❯</Button>
						</Link>}
				</h1>
				<div className={overflow ? css.overflowMode : css.main}>
					{movies.slice(top ? 1 : 0, top ? mini + 1 : mini).map((movie) =>
						<Movie
							key={movie.id}
							id={movie.id}
							title={movie.title}
							poster_path={movie.poster_path}
						/>)}
				</div>
			</>)
	}

	if (movies) {
		return (
			<div className={css.main}>
				<div className={css.header}>
					<h1>{title}</h1>
					<Button variant="outlined">
						<b style={{ margin: '3px 9px 1px 1px' }}>
							FILTER BY VOTE
						</b>
						<MovieRating
							value={rating}
							handleChange={(e, value) => setRating(value)}
						/>
					</Button>
				</div>
				<div className={css.main}>
					{params.page && movies.length !== 0 &&
						<>
							{movies.map(movie =>
								<Movie
									key={movie.id}
									id={movie.id}
									title={movie.title}
									poster_path={movie.poster_path}
								/>)}
							<div className={css.pagination}>
								<Pagination
									page={parseInt(params.page)}
									onChange={handlePageChange}
									count={totalPages}
									siblingCount={3} size='large'
								/>
							</div>
						</>}
					{movies.length === 0 && <h1>Oops! No movies found with your selected rating</h1>}
				</div>
				<Outlet />
			</div>)
	}

	if (mini) return null

	return <LoadingScreen />
}