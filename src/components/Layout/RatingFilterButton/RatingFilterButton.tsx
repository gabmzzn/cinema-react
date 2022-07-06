import Button from "@mui/material/Button/Button"
import MovieRating from "../MovieRating/MovieRating"


export const RatingFilterButton = ({ rating, onRatingChange }: { rating: number | null, onRatingChange: any }) => {

	function ratingHandler(e: React.SyntheticEvent<Element, Event>, value: number | null) {
		onRatingChange(value)
	}

	return (
		<Button variant="outlined">
			<b style={{ margin: '3px 9px 1px 1px' }}>
				FILTER BY VOTE
			</b>
			<MovieRating
				value={rating}
				handleChange={ratingHandler}
			/>
		</Button>
	)
}