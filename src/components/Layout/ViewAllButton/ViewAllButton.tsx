import Button from "@mui/material/Button/Button"
import { Link } from "react-router-dom"


export const ViewAllButton = ({ section }: { section: string }) => {
	return (
		<Link to={`${section}/1`}>
			<Button variant="outlined">
				View All ❯
			</Button>
		</Link>
	)
}