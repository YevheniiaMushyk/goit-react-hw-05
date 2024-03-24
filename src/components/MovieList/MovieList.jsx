import { Link, useLocation } from "react-router-dom";
import css from "../MovieList/MovieList.module.css";
import MovieCard from "../MovieCard/MovieCard";

const MovieList = ({ movieList }) => {
	const location = useLocation();
	return (
		<ul className={css.movieList}>
			{movieList &&
				Array.isArray(movieList) &&
				movieList.map((movie, index) => {
					return (
						<li className={css.movieItem} key={`${movie.id}_${index}`}>
							<Link to={`/movies/${movie.id}`} state={{ from: location }}>
								<MovieCard movie={movie} />
							</Link>
						</li>
					);
				})}
		</ul>
	);
};

export default MovieList;
