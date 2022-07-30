import css from './App.module.scss'
import { Navbar } from './Layout/Navbar/Navbar'
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

	if (process.env.REACT_APP_API_KEY === undefined) {
		return <h1>API Authentication Key Not Found</h1>
	}

	return (
		<ThemeProvider theme={theme}>
			<Navbar />
			<div style={content}>
				<Outlet />
				<Footer />
			</div>
		</ThemeProvider>
	)
}

export default App

const content = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: '100%',
	minHeight: '1000px'
} as React.CSSProperties