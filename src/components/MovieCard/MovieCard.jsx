import css from "./MovieCard.module.css";
import { format } from "date-fns";

const BASE_URL = "https://image.tmdb.org/t/p/w500";
// додати картинку за замовчуванням
// перевіряти дані на наявність

const MovieCard = ({ movie }) => {
	const formattedDate = format(new Date(`${movie.release_date}`), "MMM yyyy");
	return (
		<>
			<div className={css.movieImg}>
				<img src={`${BASE_URL}${movie.poster_path}`} alt={movie.original_title} />
			</div>
			<p className={css.movieText}>{movie.original_title}</p>
			<p className={css.movieText}>{formattedDate}</p>
		</>
	);
};

export default MovieCard;
