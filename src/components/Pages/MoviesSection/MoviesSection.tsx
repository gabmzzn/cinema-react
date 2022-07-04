import css from './MoviesSection.module.scss'
import { useEffect, useState } from 'react'
import { Movie } from '../../Layout/Movie/Movie'
import { Outlet, Link, useParams, useNavigate } from "react-router-dom"
import { MovieSearch } from '../../../interfaces/Movie'
import { LoadingScreen } from '../../Layout/LoadingScreen/LoadingScreen'
import { MiniSection } from './SectionsModes/MiniSection/MiniSection'
import { FullSection } from './SectionsModes/FullSection/FullSection'
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

/*
* MoviesSection displays on a wrapeable flex-box of Movies components
*	Can be used on portions of page or as main content of a iscovery
*/
export const MoviesSection = (props: MoviesSectionProps) => {

	const { section, title, sortBy, mini, isLoaded, top, movieId, overflow } = props

	const [movies, setMovies] = useState<MovieSearch[] | undefined>()
	const [totalPages, setTotalPages] = useState(0)

	let params = useParams()

	/*
	* Fetch for movies of DISCOVER or SIMILAR acording to props
	* SIMILAR is intended to use when you want to get related movies
	* based on a single movie ID
	*/
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
			setTotalPages(movies.total_pages >= 500 ? 500 : movies.total_pages)
			isLoaded && isLoaded()
		}
		fetchMovies()
	}, [params.page, sortBy])

	/* 
	* Intented to use on landing page in conjuntion with other Sections
	* 'mini' props we display an optionally shorter version 
	* 'overflow' props the discovery will display on a single row scrolleable horizontally
	* 'top' props will display a top section which with the first element of the discovery
	*/
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

	/*
	* Full version display with when no 'mini' is true
	* Here we show FilterByVote, ViewAll, and Pagination controls
	*/
	if (movies) {
		return (
			<FullSection
				title={title}
				section={section}
				page={params.page}
				movies={movies}
				onRatingChange={(movies) => setMovies(movies)}
				totalPages={totalPages}
			/>)
	}

	/*
	* Here we prevent to show LoadingScreen when 'mini' version is enabled
	* Otherwise a loading screen will shop up
	*/
	if (mini) return null

	return <LoadingScreen />
}