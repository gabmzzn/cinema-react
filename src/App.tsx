import './App.css'
import { MoviesDiscovery } from './components/MoviesDiscovery/MoviesDiscovery'
import { Header } from './components/Layout/Header/Header'

function App() {
	return (
		<>
			<Header />
			<div className="body">
				<MoviesDiscovery />
			</div>
		</>
	)

}

export default App

