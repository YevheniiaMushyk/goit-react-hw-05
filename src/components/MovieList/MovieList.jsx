import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import css from "../MovieList/MovieList.module.css";
import MovieCard from "../MovieCard/MovieCard";

const MovieList = ({ movieList }) => {
	const location = useLocation();
	const movieListRef = useRef(null);

	// useEffect(() => {
	// 	if (movieListRef.current) {
	// 		const lastMovieItem = movieListRef.current.lastChild;
	// 		if (lastMovieItem) {
	// 			const topPosition = lastMovieItem.offsetTop;
	// 			window.scrollTo({ top: topPosition, behavior: "smooth" });
	// 		}
	// 	}
	// }, [movieList]);

	return (
		<ul ref={movieListRef} className={css.movieList}>
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
