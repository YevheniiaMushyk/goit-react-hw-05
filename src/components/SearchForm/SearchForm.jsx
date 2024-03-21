import css from "./SearchForm.module.css";
// import toast, { Toaster } from "react-hot-toast";

const SearchForm = ({ onSetSearchQuery }) => {
	const handleSubmit = (evt) => {
		evt.preventDefault();
		const form = evt.target;
		// const notify = () =>
		// 	toast.error("Enter a search query", {
		// 		style: {
		// 			border: "1px solid #ff204e",
		// 			padding: "16px 20px",
		// 			color: "#ff204e",
		// 			// background-color: "#f9efdb",
		// 		},
		// 		iconTheme: {
		// 			primary: "#ff204e",
		// 			secondary: "#FFFAEE",
		// 		},
		// 	});

		const inputValue = form.elements.inputValue.value.trim();
		// if (!inputValue) {
		// 	notify();
		// 	return;
		// }
		onSetSearchQuery(inputValue);

		form.reset();
	};
	return (
		<form className={css.form} onSubmit={handleSubmit}>
			<div>
				<input className={css.input} type="text" autoComplete="off" name="inputValue" required spellCheck="true" />
				<span className={css.text}>movie title</span>
			</div>

			<button className={css.button} type="submit">
				<span className={css.btnText}>search</span>
			</button>
		</form>
	);
};

export default SearchForm;
