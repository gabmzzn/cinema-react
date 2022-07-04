import Input from '@mui/material/Input/Input'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import css from './InputSearch.module.scss'

export const InputSearch = () => {

	let navigate = useNavigate()
	let params = useParams()
	const [query, setQuery] = useState<string>('')

	/* Here we populate the input when the user acceses a search route directly
	* So we prevent the timer to redirect to discover given that the string
	* Will be empty
	*/
	useEffect(() => {
		params.hasOwnProperty('query') &&
			params.query !== undefined &&
			setQuery(params.query)
	}, [])

	// Here we clean the input if user changes route
	useEffect(() => {
		if (query !== '' && !('query' in params)) {
			setQuery('')
		}
	}, [params])

	/*
	* Automatic search if user didnt write anymore for 1s
	*	If input is empty, we redirect to Discover page
	* Otherwise we search, if the user presses Enter we skip the timer
	*/
	useEffect(() => {
		const timer = setTimeout(() => {
			if (query === '' && params.hasOwnProperty('query')) {
				navigate('/discover/')
			}
			else if (query !== '' && !/\s/g.test(query)) {
				navigate(`/search/${query}/1`)
			}
		}, 1000)
		return () => clearTimeout(timer)
	}, [query])

	function handleQuery(query: string, key: boolean) {
		key ? navigate(`/search/${query}/1`) : setQuery(query)
	}

	return (
		<div className={css.search}>
			<Input
				placeholder="Search your movies"
				sx={{ color: 'white' }}
				fullWidth
				value={query}
				onChange={e => handleQuery(e.target.value, false)}
				onKeyPress={(e: React.KeyboardEvent<HTMLImageElement>) => {
					if (e.key === "Enter") {
						e.preventDefault()
						handleQuery((e.target as HTMLInputElement).value, true)
					}
				}}
			/>
		</div>)
}