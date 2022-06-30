import './styles/App.css'
import { MoviesDiscovery } from './pages/MoviesDiscovery/MoviesDiscovery'
import { Header } from './components/Layout/Header/Header'
import { Outlet, Link } from "react-router-dom"

function App() {
	return (
		<>
			<Header />
			<div className="body">
				<div className='content'>
					<Outlet />
				</div>
			</div>
		</>
	)

}

export default App

