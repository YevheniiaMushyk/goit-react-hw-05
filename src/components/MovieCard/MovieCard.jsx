import { format } from "date-fns";
import css from "./MovieCard.module.css";
import DefaultImage from "../DefaultImage/DefaultImage";

const BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
	const formattedDate = (date) => {
		return format(new Date(date), "MMM yyyy");
	};

	return (
		<>
			<div className={css.movieImg}>
				{movie.poster_path ? <img src={`${BASE_URL}${movie.poster_path}`} alt={movie.title ? movie.title : "movie poster"} /> : <DefaultImage />}
			</div>
			<p className={css.movieText}>{movie.title ? movie.title : "No data"}</p>
			<p className={css.movieText}>{movie.release_date ? formattedDate(movie.release_date) : "No data"}</p>
		</>
	);
};

export default MovieCard;
