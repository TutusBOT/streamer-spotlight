import { streamer } from "../pages/Streamer";
import { Link } from "react-router-dom";
import VoteArrow from "./vote-arrow.svg";

interface streamerList {
	streamers?: streamer[];
}

function StreamerList({ streamers }: streamerList) {
	return (
		<ul className="grid w-full max-w-6xl grid-cols-1 py-4 text-white bg-gray-800 border-2 border-white shadow-2xl lg:grid-cols-2 lg:before:w-[1px] before:bg-white before:h-full before:absolute relative before:top-0 before:l-1/2 before:-translate-x-1/2 rounded-xl justify-items-center">
			{streamers?.map((streamer) => (
				<li
					key={streamer.name}
					className="grid w-full grid-cols-3 gap-4 px-8 py-4 text-xl transition-colors hover:bg-gray-700"
				>
					<Link
						to={`/streamer?id=${streamer._id}`}
						className="relative w-fit before:opacity-0 before:transition-opacity hover:before:opacity-100 before:w-full before:bg-white before:absolute before:bottom-0 before:left-0 before:h-[1px]"
					>
						{streamer.name}
					</Link>
					<div>{streamer.platform}</div>
					<div className="flex items-center gap-2 place-self-end">
						<button>
							<img className="w-6 h-6" src={VoteArrow} alt="" />
						</button>
						{streamer.votes}
						<button>
							<img className="w-6 h-6 rotate-180" src={VoteArrow} alt="" />
						</button>
					</div>
				</li>
			))}
		</ul>
	);
}
export default StreamerList;
