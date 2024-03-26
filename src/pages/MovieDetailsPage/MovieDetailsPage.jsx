import { useEffect, useState, useRef } from "react";
import { NavLink, Link, Outlet, useParams, useLocation } from "react-router-dom";
import baseUrl from "../../url";
import clsx from "clsx";
import Loader from "../../components/Loader/Loader";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieId from "../../components/MovieId/MovieId";
import css from "./MovieDetailsPage.module.css";

const getAddLinkClassNames = ({ isActive }) => clsx(css.addLink, isActive && css.active);

const MovieDetailsPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [movie, setMovie] = useState({});
	const [errorMessage, setErrorMessage] = useState("");
	const [isScrollToTop, setScrollToTop] = useState(false);
	const { movieId } = useParams();
	const location = useLocation();
	const backLink = useRef(location.state ?? "/");
	console.log(backLink.current);

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

		async function fetchMovieId() {
			if (!movieId) return;
			try {
				setIsError(false);
				setIsLoading(true);
				const { data } = await baseUrl.get(`movie/${movieId}`, options);
				setMovie(data);
			} catch (err) {
				setIsError(true);
				setErrorMessage(err);
			} finally {
				setIsLoading(false);
			}
		}

		fetchMovieId();
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
			<div className={css.btnBack}>
				<Link className={css.btnBackLink} to={backLink.current}>
					<span className={css.btnBackText}>Go back</span>
				</Link>
			</div>
			{isLoading && <Loader />}
			{!isLoading && (
				<>
					<div className={css.movieIdContainer}>{!isError ? <MovieId movie={movie} /> : <ErrorMessage message={errorMessage} />}</div>
					{!isError && (
						<>
							<p className={css.detailPart}>Aditional information</p>

							<ul className={css.detailsList}>
								<li className={css.detailsItem}>
									<NavLink className={getAddLinkClassNames} to="cast">
										Cast
									</NavLink>
								</li>
								<li className={css.detailsItem}>
									<NavLink className={getAddLinkClassNames} to="reviews">
										Reviews
									</NavLink>
								</li>
							</ul>
							<Outlet />
						</>
					)}
				</>
			)}
			{isScrollToTop && <ScrollToTop scrollToTop={scrollToTop} />}
		</div>
	);
};

export default MovieDetailsPage;
