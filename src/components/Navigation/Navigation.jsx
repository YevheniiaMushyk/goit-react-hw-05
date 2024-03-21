import { NavLink } from "react-router-dom";
import css from "../Navigation/Navigation.module.css";
import clsx from "clsx";

const getNavLinkClassNames = ({ isActive }) => clsx(css.navLink, isActive && css.active);

const Navigation = () => {
	return (
		<>
			<NavLink className={getNavLinkClassNames} to="/">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<h1 className={css.title}>Home</h1>
			</NavLink>
			<NavLink className={getNavLinkClassNames} to="/movies">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<h1 className={css.title}>Movies</h1>
			</NavLink>
		</>
	);
};

export default Navigation;
