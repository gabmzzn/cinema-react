import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import css from './MovieDetails.module.scss'

const apiKey = process.env.REACT_APP_API_KEY

interface Movie {
	backdrop_path: string,
	budget: number,
	original_title: string,
	overview: string,
	vote_average: number
	videos: any,
	credits: any
}

export const MovieDetails = () => {

	const params = useParams()
	const { id, title } = params

	const [movie, setMovie] = useState<Movie>()


	useEffect(() => {
		async function fetchMovie() {
			const data = await fetch(`
			https://api.themoviedb.org/3/movie/${id}
			?api_key=${apiKey}
			&language=en-US
			&append_to_response=videos,credits
			`)
				.then(r => r.json())
			setMovie(data)
		}
		fetchMovie()
	}, [])

	let trailer = undefined
	function videoTrailer() {
		//This tries to determine which video is a movie trailer
		//If we dont get a 'trailer' keyword we stick to the first video
		const videos = movie && movie.videos.results
		if (videos.length > 0) {
			const videoName = videos.find((vid: any) =>
				vid.name.includes('trailer') || vid.name.includes('Trailer')
			)
			trailer = videoName ? videoName.key : videos[0].key
			return true
		}
		return false
	}

	return <>
		{movie && <>
			<h2><b style={{ color: 'green' }}>{movie.original_title}</b> scored <b style={{ color: 'red' }}>{movie.vote_average}</b></h2>
			<h5>{movie.overview}</h5>
			{videoTrailer() &&
				<iframe width="860" height="515" src={`https://www.youtube.com/embed/${trailer}`}
					title={movie.original_title}
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			}
			<img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} width={'800px'} />
			<div className={css.cast}>
				{movie.credits.cast.map((act: any) => {
					const img = act.profile_path ?
						`https://image.tmdb.org/t/p/w500${act.profile_path}` :
						'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
					return (
						<div className={css.act}>
							<div>
								<h4>{act.name}</h4>
								<h5>{act.character}</h5>
								<img src={img} width={'200px'} />
								<h5>{act.known_for_department}</h5>
							</div>
						</div>
					)
				}
				)}
			</div>
		</>}
	</>
}