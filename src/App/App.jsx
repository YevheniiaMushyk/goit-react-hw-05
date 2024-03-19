import { Route, Routes } from "react-router-dom";
import css from "../App/App.module.css";
import Navigation from "../components/Navigation/Navigation";
import HomePage from "path/to/pages/HomePage/HomePage";
import MoviesPage from "path/to/pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "path/to/pages/MovieDetailsPage/MovieDetailsPage";
import NotFoundPage from "path/to/pages/NotFoundPage/NotFoundPage";

function App() {
	return (
		<div>
			<header className={css.header}>
				<Navigation />
			</header>
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/movies" element={<MoviesPage />} />
					<Route path="/movies/:movieId" element={<MovieDetailsPage />}>
						<Route path="cast" element={<MovieCast />} />
						<Route path="reviews" element={<MovieReviews />} />
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
