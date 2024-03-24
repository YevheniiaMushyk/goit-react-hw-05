import css from "../LoadMoreBtn/LoadMoreBtn.module.css";

const LoadMoreBtn = ({ handleLoadMore }) => {
	return (
		<div className={css.loadMore}>
			<button className={css.loadMoreBtn} type="button" onClick={handleLoadMore}>
				<span className={css.loadMoreBtnText}>Load more</span>
			</button>
		</div>
	);
};

export default LoadMoreBtn;
