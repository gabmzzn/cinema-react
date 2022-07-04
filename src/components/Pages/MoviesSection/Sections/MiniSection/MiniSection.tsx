import Button from "@mui/material/Button/Button"
import { Link } from "react-router-dom"
import { MovieDiscover } from "../../../../../interfaces/Movie"
import { Movie } from "../../../../Layout/Movie/Movie"
import { TopPopularMovie } from "./TopPopularMovie/TopPopularMovie"
import css from './MiniSection.module.scss'

interface MiniSectionProps {
	top: boolean | undefined
	title: string
	section: string
	movies: MovieDiscover[]
	overflow?: boolean
	miniAmount: number
}

/*
* Intented to use on landing page in conjuntion with other Sections
* 'mini' props we display an optionally shorter version 
* 'overflow' props the discovery will display on a single row scrolleable horizontally
* 'top' props will display a top section which with the first element of the discovery
*/
export const MiniSection = ({ top, movies, title, section, overflow, miniAmount }: MiniSectionProps) => {
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
				{movies.slice(top ? 1 : 0, top ? miniAmount + 1 : miniAmount).map((movie) =>
					<Movie
						key={movie.id}
						id={movie.id}
						title={movie.title}
						poster_path={movie.poster_path}
					/>)}
			</div>
		</>)
}