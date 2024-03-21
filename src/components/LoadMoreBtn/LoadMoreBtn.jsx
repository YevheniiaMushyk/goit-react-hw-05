import css from "../LoadMoreBtn/LoadMoreBtn.module.css";

const LoadMoreBtn = ({ handleLoadMore }) => {
	return (
		<button className={css.loadMoreBtn} type="button" onClick={handleLoadMore}>
			<span className={css.loadMoreBtnText}>Load more</span>
		</button>
	);
};

export default LoadMoreBtn;
