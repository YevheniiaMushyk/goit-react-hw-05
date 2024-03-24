import { Link } from "react-router-dom";
import css from "../NotFoundPage/NotFoundPage.module.css";

const NotFoundPage = () => {
	return (
		<div className={css.notfound}>
			<p>This page is not found</p>
			<p>404</p>
			<Link to="/">Back to main</Link>
		</div>
	);
};

export default NotFoundPage;
