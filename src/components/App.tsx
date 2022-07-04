import css from './App.module.scss'
import { Header } from './Layout/Header/Header'
import { Outlet } from "react-router-dom"
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import createTheme from '@mui/material/styles/createTheme'
import { Footer } from './Layout/Footer/Footer'

declare module '@mui/material/styles' {
	interface Theme {
		status: {
			danger: string
		}
	}
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
		}
	},
})

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Header />
			<div className={css.content}>
				<Outlet />
				<Footer />
			</div>
		</ThemeProvider>
	)
}

export default App

