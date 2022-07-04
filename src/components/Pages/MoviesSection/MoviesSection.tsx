import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { MovieDiscover, MovieSearch } from '../../../interfaces/Movie'
import { LoadingScreen } from '../../Layout/LoadingScreen/LoadingScreen'
import { MiniSection } from './Sections/MiniSection/MiniSection'
import { FullSection } from './Sections/FullSection/FullSection'
const apiKey = process.env.REACT_APP_API_KEY

interface MoviesSectionProps {
	section: string
	title: string
	sortBy?: string
	mini?: number
	top?: boolean
	cards?: boolean
	isLoaded?: () => void
	movieId?: number
	overflow?: boolean
}

/*
* MoviesSection displays on a wrapeable flex-box of Movies components
*	Can be used on portions of page (MiniSection) or as main content of a discovery (FullSection)
*/
export const MoviesSection = (props: MoviesSectionProps) => {

	const { section, title, sortBy, cards, mini, isLoaded, top, movieId, overflow } = props

	const [movies, setMovies] = useState<MovieDiscover[] | undefined>()
	const [totalPages, setTotalPages] = useState(0)

	const [loading, setLoading] = useState(true)

	let params = useParams()

	/*
	* Fetch for movies of DISCOVER/SIMILAR/SEARCH categories acording to props
	*/
	useEffect(() => {
		async function fetchMovies() {

			const similar = `movie/${movieId}/similar`
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
	}, [params.page, sortBy, params.query])

	/* 
 * Handles rating, if we unselect the rating we display the original fetch
 */
	const [fetchedMovies, setFetchedMovies] = useState<MovieSearch[]>()
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
	}, [rating])

	//Here we make sure to not show loading screen when 'mini' is on
	if (loading && !mini) return <LoadingScreen />

	if (movies && mini) {
		return (
			<MiniSection
				top={top}
				title={title}
				section={section}
				movies={movies}
				overflow={overflow}
				miniAmount={mini}
			/>)
	}

	if (movies) {
		return (
			<FullSection
				title={title}
				section={section}
				params={params}
				movies={movies}
				rating={rating}
				cards={cards}
				onRatingChange={value => setRating(value)}
				totalPages={totalPages}
			/>)
	}

	return null
}