import { useState, useEffect } from 'react'
import Rating from '@mui/material/Rating'


export default function BasicRating(props: any) {

	const { value, handleChange } = props

	return (
		<Rating
			size='large'
			name="simple-controlled"
			value={value}
			onChange={handleChange}
		/>
	)
}
