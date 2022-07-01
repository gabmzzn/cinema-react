export interface MovieSearch {
	id: number
	title: string
	overview?: string
	genre_id?: number[]
	popularity: number
	vote_average: number
	vote_count: number
	release_date?: string
	original_language?: string
	poster_path?: string | null
	backdrop_path?: string | null
}

export interface MovieDetail {
	id: number
	title?: string
	original_title?: string
	overview?: string
	popularity?: number
	vote_average: number
	vote_count?: number
	release_date?: string
	original_language?: string
	poster_path?: string | null
	backdrop_path?: string | null
	credits?: {
		cast: any
	}
	videos?: {
		results: any
	}
}