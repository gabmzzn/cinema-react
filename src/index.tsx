import React from 'react'
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './components/App'
import reportWebVitals from './tests/reportWebVitals'
import { MovieDetails } from './components/Pages/MovieDetails/MovieDetails'
import { MoviesDiscovery } from './components/Pages/MoviesDiscovery/MoviesDiscovery'
import { MoviesSection } from './components/Pages/MoviesSection/MoviesSection'
import {
	BrowserRouter,
	Routes,
	Navigate,
	Route,
} from "react-router-dom"

// This scrolls to top whenever there's a rute change
export function ScrollToTop() {
	const { pathname } = useLocation()
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	return null
}

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="/" element={<Navigate to="/discover/" replace />} />
					<Route path='/discover/' element={<MoviesDiscovery />} />
					<Route path='/discover/popular/:page'
						element={<MoviesSection
							section={'popular'}
							title={'Popular Right Now 🔥'}
							ratingFilter pagination
						/>}
					/>
					<Route path='/discover/latest/:page'
						element={<MoviesSection
							section={'latest'}
							title={'Latest Releases of the month🍿'}
							sortBy={'release_date.desc&vote_count.gte=20'}
							ratingFilter pagination
						/>}
					/>
					<Route path='/discover/suggested/:page'
						element={<MoviesSection
							section={'suggested'}
							title={'Our suggestions for you ❤️'}
							sortBy={'vote_count.desc&vote_count.gte=20'}
							ratingFilter pagination
						/>}
					/>
					<Route path="/search/:query/:page"
						element={<MoviesSection
							section={'search'}
							title={'Movie Search 🔍'}
							cards={true}
							ratingFilter pagination
						/>} />
					<Route path="/movie/:id" element={<MovieDetails />} />
					<Route path="*"
						element={
							<main style={{ padding: "1rem" }}>
								<h1>There's nothing here!</h1>
							</main>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
