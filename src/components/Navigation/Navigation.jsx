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
				Home
			</NavLink>
			<NavLink className={getNavLinkClassNames} to="/movies">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				Movies
			</NavLink>
		</>
	);
};

export default Navigation;
