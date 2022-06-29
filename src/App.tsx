import './App.css'
import { MoviesDiscovery } from './pages/MoviesDiscovery/MoviesDiscovery'
import { Header } from './components/Layout/Header/Header'
import { Outlet, Link } from "react-router-dom"

function App() {
	return (
		<>
			<Header />
			<div className="body">
				<Outlet />
			</div>
		</>
	)

}

export default App

