import MovieCard from "../MovieCard/MovieCard";
import css from "../MovieList/MovieList.module.css";
import { Link } from "react-router-dom";

const MovieList = ({ movieList }) => {
	return (
		<ul className={css.movieList}>
			{movieList &&
				Array.isArray(movieList) &&
				movieList.map((movie, index) => {
					return (
						<li className={css.movieItem} key={`${movie.id}_${index}`}>
							<Link to={`/movies/${movie.id}`}>
								<MovieCard movie={movie} />
							</Link>
						</li>
					);
				})}
		</ul>
	);
};

export default MovieList;
