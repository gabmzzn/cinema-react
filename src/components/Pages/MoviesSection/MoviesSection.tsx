import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { MovieDiscover, MovieSearch } from '../../../interfaces/Movie'
import { LoadingScreen } from '../../Layout/LoadingScreen/LoadingScreen'
import { Movie } from '../../Layout/Movie/Movie'
import { TopPopularMovie } from './TopPopularMovie/TopPopularMovie'
import { MovieCard } from '../../Layout/MovieCard/MovieCard'
import Pagination from "@mui/material/Pagination/Pagination"
import { Outlet, useNavigate } from "react-router-dom"
import css from './MoviesSection.module.scss'
import { RatingFilterButton } from '../../Layout/RatingFilterButton/RatingFilterButton'
import { ViewAllButton } from '../../Layout/ViewAllButton/ViewAllButton'
const apiKey = process.env.REACT_APP_API_KEY

interface MoviesSectionProps {
	section: string
	title: string
	sortBy?: string
	similarTo?: number
	mini?: number
	top?: boolean
	cards?: boolean
	viewAll?: boolean
	pagination?: boolean
	overflow?: boolean
	ratingFilter?: boolean
	isLoaded?: () => void
}

/*
* MoviesSection displays on a wrapeable flex-box of Movies components
*	Can be used on portions of page (mini) or as main content of a discovery
* 'mini' props we display an optionally shorter version 
* 'overflow' props the discovery will display on a single row scrolleable horizontally
* 'top' props will display a top section which with the first element of the discovery
* 'viewAll' will display a ViewAll button redirecting to a full version of the discovery
* 'paginations' will display the paginations controls
* 'ratingFilter' will display the rating filter of the section
*/
export const MoviesSection = (props: MoviesSectionProps) => {

	const { section, title, sortBy, cards, mini, isLoaded, top, similarTo, overflow, pagination, viewAll, ratingFilter } = props

	const [movies, setMovies] = useState<MovieDiscover[] | undefined>()
	const [totalPages, setTotalPages] = useState(0)
	const [loading, setLoading] = useState(true)
	const [fetchedMovies, setFetchedMovies] = useState<MovieSearch[]>()

	let params = useParams()

	//Fetch for movies of DISCOVER/SIMILAR/SEARCH categories acording to props
	useEffect(() => {
		async function fetchMovies() {

			const similar = `movie/${similarTo}/similar`
			const discover = 'discover/movie'
			const search = 'search/movie'

			setLoading(true)
			const movies = await fetch(`
			https://api.themoviedb.org/3/
			${section === 'similar' ? similar : section !== 'search' ? discover : search}
			?api_key=${apiKey}
			&include_adult=false
			${section === 'search' ? `&query=${params.query}` : ''}
			${mini ? '' : `&page=${params.page}`}
			${sortBy ? `&sort_by=${sortBy}` : ''}
			`).then(r => r.json())

			// This is for getting the most relevant results of the search
			section === 'search' && movies.results
				.sort((a: MovieSearch, b: MovieSearch) => b.vote_count - a.vote_count)

			setMovies(movies.results)
			setFetchedMovies(movies.results)
			setTotalPages(movies.total_pages >= 500 ? 500 : movies.total_pages)
			isLoaded && isLoaded()
			setLoading(false)
		}
		fetchMovies()
		// eslint-disable-next-line
	}, [params.page, params.query])


	//Handles rating, if we unselect the rating we display the original fetch
	const [rating, setRating] = useState<number | null>(null)
	useEffect(() => {
		if (rating) {
			const moviesByRating = fetchedMovies?.filter(movie =>
				movie.vote_average >= rating * 2 - 2 &&
				movie.vote_average <= rating * 2
			)
			setMovies(moviesByRating)
		}
		else {
			setMovies(fetchedMovies)
		}
	}, [rating, fetchedMovies])

	/* 
	 * Handles pagination, the fetchMovies() function gets 
	 * triggered automatically cause it's useEffect function
	 * is monitoring Routes (params.page) changes
	 */
	let navigate = useNavigate()
	const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
		section !== 'search' ?
			navigate(`/discover/${section}/${page}`) :
			navigate(`/search/${params?.query}/${page}`)
		setRating(null)
	}

	//Here we make sure to not show loading screen when 'mini' is on
	if (loading && !mini) return <LoadingScreen />

	if (movies) {

		const sliceParams = [0, movies.length]
		if (mini !== undefined) {
			sliceParams[0] = top ? 1 : 0
			sliceParams[1] = top ? mini + 1 : mini
		}

		return (
			<div className={css.main}>
				{top && <TopPopularMovie movie={movies[0]} />}
				<div className={css.header}>
					<h1>{title}</h1>
					{ratingFilter &&
						<RatingFilterButton rating={rating} onRatingChange={(v: number) => setRating(v)}
						/>}
					{viewAll && <ViewAllButton section={section} />}
				</div>
				<div className={overflow ? css.overflow : css.main}>
					{movies && movies.slice(...sliceParams).map(m =>
						!cards ? <Movie key={m.id} movie={m} /> : <MovieCard key={m.id} movie={m} />
					)}
					{pagination && params.page &&
						<div className={css.pagination}>
							<Pagination
								page={parseInt(params.page)}
								onChange={handlePageChange}
								count={totalPages}
								siblingCount={3} size='large'
							/>
						</div>}
					{rating && movies.length === 0 && <h1>Oops! No movies found with your selected rating</h1>}
				</div>
				<Outlet />
			</div>)
	}

	return null
}