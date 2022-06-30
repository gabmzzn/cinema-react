import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './App'
import reportWebVitals from './tests/reportWebVitals'
import {
	BrowserRouter,
	Routes,
	Navigate,
	Route,
} from "react-router-dom"
import { MovieDetails } from './pages/MovieDetails/MovieDetails'
import { MoviesDiscovery } from './pages/MoviesDiscovery/MoviesDiscovery'
import { MoviesSection } from './pages/MoviesSection/MoviesSection'
import { MoviesSearch } from './pages/MoviesSearch/MoviesSearch'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route path="/" element={<Navigate to="/discover" replace />} />
					<Route path='/discover' element={<MoviesDiscovery />} />
					<Route path='/discover/trending'
						element={<MoviesSection section={'trending'} />}
					/>
					<Route path='/discover/latest'
						element={<MoviesSection section={'latest'} />}
					/>
					<Route path='/discover/foryou'
						element={<MoviesSection section={'foryou'} />}
					/>
					<Route path="/search/:id" element={<MoviesSearch />} />
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
