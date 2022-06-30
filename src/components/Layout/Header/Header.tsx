import css from './Header.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Input from '@mui/material/Input/Input'

export const Header = () => {

	let navigate = useNavigate()
	const [query, setQuery] = useState<string | undefined>(undefined)

	useEffect(() => {
		if (query !== undefined) {
			const timer = setTimeout(() => {
				query !== '' ? navigate(`/search/${query}/1`) : navigate('/discover/')
			}, 1000)
			return () => clearTimeout(timer)
		}
	}, [query])

	return (
		<div className={css.header}>
			<div className={css.navbar}>
				<div className={css.content}>
					<Link to='/discover/'>
						<h2>React Movies</h2>
					</Link>
					<div className={css.search}>
						<Input
							placeholder="Search for movies"
							sx={{ color: 'white' }}
							fullWidth
							onChange={e => setQuery(e.target.value)}
							onKeyPress={(e: any) => {
								if (e.key === "Enter") {
									e.preventDefault()
									navigate(`/search/${e.target.value}/1`)
								}
							}}
						/>
					</div>
				</div>
			</div>
		</div>)
}