import { useEffect, useState } from "react";
import axios from "axios";
import css from "../HomePage/HomePage.module.css";
import Loader from "../../components/Loader/Loader";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

const HomePage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isLoadMore, setIsLoadMore] = useState(false);
	const [movieList, setMovieList] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [queryPage, setQueryPage] = useState(1);
	const [isScrollToTop, setScrollToTop] = useState(false);

	axios.defaults.baseURL = "https://api.themoviedb.org/3/";

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
				page: queryPage,
			},
		};

		async function fetchMovies() {
			try {
				setIsError(false);
				setIsLoading(true);
				setIsLoadMore(false);

				const { data } = await axios.get("trending/movie/day", options);
				setMovieList((prevList) => [...prevList, ...data.results]);

				if (queryPage < data.total_pages) {
					setIsLoadMore(true);
				}
			} catch (err) {
				setIsError(true);
				setErrorMessage(err);
			} finally {
				setIsLoading(false);
			}
		}

		fetchMovies();
	}, [queryPage]);

	const handleLoadMore = () => {
		setQueryPage((prevPage) => prevPage + 1);
	};

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
		<div className={css.homeContainer}>
			{isLoading && <Loader />}
			{!isLoading && <>{!isError ? <MovieList movieList={movieList} /> : <ErrorMessage message={errorMessage} />}</>}
			{isLoadMore && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
			{isScrollToTop && <ScrollToTop scrollToTop={scrollToTop} />}
		</div>
	);
};
export default HomePage;
