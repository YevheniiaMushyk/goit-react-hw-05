import css from "./SearchForm.module.css";

const SearchForm = ({ onSetSearchQuery }) => {
	const handleSubmit = (evt) => {
		evt.preventDefault();
		const form = evt.target;

		const inputValue = form.elements.inputValue.value.trim();
		if (!inputValue) {
			alert("The movie title cannot be empty");
			return;
		}
		onSetSearchQuery(inputValue);

		form.reset();
	};
	return (
		<form className={css.form} onSubmit={handleSubmit}>
			<div>
				<input className={css.input} type="text" autoComplete="off" name="inputValue" required spellCheck="true" />
				<span className={css.text}>movie title</span>
			</div>
			<div className={css.search}>
				<button className={css.searchBtn} type="submit">
					<span className={css.searchBtnText}>search</span>
				</button>
			</div>
		</form>
	);
};

export default SearchForm;
