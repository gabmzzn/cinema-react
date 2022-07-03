import css from './MoviesDiscovery.module.scss'
import { useState } from 'react'
import { Outlet } from "react-router-dom"
import { LoadingScreen } from '../../Layout/LoadingScreen/LoadingScreen'
import { MoviesSection } from '../MoviesSection/MoviesSection'

export const MoviesDiscovery = () => {

	const [ready, setReady] = useState(0)

	const handleLoad = () => setReady(v => v + 1)

	return (
		<div className={css.discovery}>
			{ready < 3 && <LoadingScreen />}
			<MoviesSection
				top
				mini={10}
				isLoaded={handleLoad}
				section={'popular'}
				title={'Most popular movies of the moment 🔥'}
				sortBy={'popularity.desc'}
			/>
			<MoviesSection
				mini={10}
				section={'latest'}
				isLoaded={handleLoad}
				title={'Latest Releases of the month🍿'}
				sortBy={'release_date.desc&vote_count.gte=20'}
			/>
			<MoviesSection
				mini={10}
				section={'suggested'}
				isLoaded={handleLoad}
				title={'Our suggestions for you ❤️'}
				sortBy={'vote_count.desc&vote_count.gte=20'}
			/>
			<Outlet />
		</div>)

}