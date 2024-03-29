import { useEffect, useState } from "react";
import css from "../HomePage/HomePage.module.css";
import { instance, options } from "../../url";
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

	useEffect(() => {
		async function fetchMovies() {
			try {
				setIsError(false);
				setIsLoading(true);
				setIsLoadMore(false);

				const { data } = await instance.get("trending/movie/day", { ...options, params: { ...options.params, page: queryPage } });
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
			<h1 className={css.homeTitle}>Trending today</h1>
			{!isError ? <MovieList movieList={movieList} /> : <ErrorMessage message={errorMessage} />}
			{isLoading && <Loader />}
			{isLoadMore && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
			{isScrollToTop && <ScrollToTop scrollToTop={scrollToTop} />}
		</div>
	);
};
export default HomePage;
