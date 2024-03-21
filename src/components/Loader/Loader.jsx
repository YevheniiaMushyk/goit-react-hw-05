import css from "../Loader/Loader.module.css";

const Loader = () => {
	return (
		<div className={css.loader}>
			<div className={css.ringContainer}>
				<div className={css.ring}></div>
				<div className={css.ring}></div>
				<div className={css.ring}></div>
				<span className={css.text}>Loading...</span>
			</div>
		</div>
	);
};

export default Loader;
