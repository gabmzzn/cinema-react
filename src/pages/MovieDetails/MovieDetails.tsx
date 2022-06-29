import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const apiKey = process.env.REACT_APP_API_KEY

interface Movie {
	backdrop_path: string,
	budget: number,
	original_title: string,
	overview: string,
	vote_average: number
	videos: any
}

export const MovieDetails = () => {

	let params = useParams()
	const { id, title } = params

	const [movie, setMovie] = useState<Movie>()


	useEffect(() => {
		async function fetchMovie() {
			const data = await fetch(`
			https://api.themoviedb.org/3/movie/${id}
			?api_key=${apiKey}
			&language=en-US
			&append_to_response=videos
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
		<h1>Hello ❤️</h1>
		{movie && <>
			<h2>Your movie title is <b style={{ color: 'green' }}>{movie.original_title}</b> and it's scored <b style={{ color: 'red' }}>{movie.vote_average}</b></h2>
			{videoTrailer() &&
				<iframe width="860" height="515" src={`https://www.youtube.com/embed/${trailer}`}
					title={movie.original_title}
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			}

			<h5>{movie.overview}</h5>
			<img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} width={'800px'} />
		</>}
	</>
}