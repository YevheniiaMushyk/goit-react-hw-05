import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieId from "../../components/MovieId/MovieId";
import css from "./MovieDetailsPage.module.css";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import clsx from "clsx";

const getAddLinkClassNames = ({ isActive }) => clsx(css.addLink, isActive && css.active);

const MovieDetailsPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [movie, setMovie] = useState({});
	const [errorMessage, setErrorMessage] = useState("");
	const [isScrollToTop, setScrollToTop] = useState(false);

	axios.defaults.baseURL = "https://api.themoviedb.org/3/";
	const { movieId } = useParams();
	const location = useLocation();
	const backLinkRef = useRef(location.state ?? "/");

	useEffect(() => {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization:
					"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM2YzMzU0OWYzYjc3MDE2MDcxYzYwYTlmM2IyNWU4NiIsInN1YiI6IjY1ZmMxMmRmNjA2MjBhMDE3YzI3MTUxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bpsk2SRHCKtimBFb0iVHaVxrP_IpAcKrpk3AiH6f_Uo",
			},
			params: {
				language: "en-US",
			},
		};

		async function fetchMovies() {
			setMovie({});
			try {
				setIsError(false);
				setIsLoading(true);
				const { data } = await axios.get(`movie/${movieId}`, options);
				setMovie(data);
			} catch (err) {
				setIsError(true);
				setErrorMessage(err);
			} finally {
				setIsLoading(false);
			}
		}

		fetchMovies();
	}, [movieId]);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 200) {
				setScrollToTop(true);
			} else {
				setScrollToTop(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	});

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<div className={css.detailsPage}>
			<NavLink className={css.btnBack} to={backLinkRef.current}>
				Go back
			</NavLink>
			<div className={css.movieIdContainer}>{!isError ? <MovieId movie={movie} /> : <ErrorMessage message={errorMessage} />}</div>
			<p className={css.detailPart}>Aditional information</p>
			<ul className={css.detailsList}>
				<li>
					<NavLink className={getAddLinkClassNames} to="cast">
						Cast
					</NavLink>
				</li>
				<li>
					<NavLink className={getAddLinkClassNames} to="reviews">
						Reviews
					</NavLink>
				</li>
			</ul>
			<Outlet />
			{isLoading && <Loader />}
			{isScrollToTop && <ScrollToTop scrollToTop={scrollToTop} />}
		</div>
	);
};

export default MovieDetailsPage;
