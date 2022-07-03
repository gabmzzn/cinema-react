import './styles/App.css'
import { Header } from './components/Layout/Header/Header'
import { Outlet } from "react-router-dom"
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import createTheme from '@mui/material/styles/createTheme'
import { Footer } from './components/Layout/Footer/Footer'

declare module '@mui/material/styles' {
	interface Theme {
		status: {
			danger: string
		}
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		status?: {
			danger?: string
		}
	}
}

const theme = createTheme({
	palette: {
		primary: {
			main: '#ff8c00',
		},
		// secondary: {
		// 	main: green[500],
		// },
	},
})
function App() {
	return (
		<ThemeProvider theme={theme}>
			<Header />
			<div className="body">
				<div className='content'>
					<Outlet />
					<Footer />
				</div>
			</div>
		</ThemeProvider>
	)

}

export default App

