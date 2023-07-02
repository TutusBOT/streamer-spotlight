import { Link } from "react-router-dom";

function Navbar() {
	return (
		<nav className="absolute top-2 left-2 flex items-center justify-start text-2xl bg-gray-800 text-white border-[1px] border-white  rounded-xl  hover:text-purple-700 hover:border-purple-700 transition-colors">
			<Link to="/" className="px-4 py-2">
				Home
			</Link>
		</nav>
	);
}
export default Navbar;
