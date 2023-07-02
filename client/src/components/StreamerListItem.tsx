import { Link } from "react-router-dom";
import { streamer } from "../pages/Streamer";
import DownvoteArrowIcon from "../icons/downvote-arrow.svg";
import UpvoteArrowIcon from "../icons/upvote-arrow.svg";
import VoteArrowIcon from "../icons/vote-arrow.svg";

interface StreamerListItemProps {
	streamer: streamer;
	currentVote:
		| {
				id: string;
				vote: "upvote" | "downvote";
		  }
		| undefined;
	handleVote: (
		vote: "upvote" | "downvote",
		id: string,
		currentVote:
			| {
					id: string;
					vote: "upvote" | "downvote";
			  }
			| undefined
	) => Promise<void>;
}

function StreamerListItem({
	streamer,
	currentVote,
	handleVote,
}: StreamerListItemProps) {
	const isUpvoted = currentVote?.vote === "upvote";
	const isDownvoted = currentVote?.vote === "downvote";
	return (
		<li className="grid w-full grid-cols-3 gap-4 px-4 py-4 text-xl transition-colors sm:px-8 hover:bg-gray-700">
			<Link
				to={`/streamer?id=${streamer._id}`}
				className="relative w-fit before:opacity-0 before:transition-opacity hover:before:opacity-100 before:w-full before:bg-white before:absolute before:bottom-0 before:left-0 before:h-[1px]"
			>
				{streamer.name}
			</Link>
			<div>{streamer.platform}</div>
			<div className="flex items-center gap-2 place-self-end">
				<button
					className="transition-colors hover:bg-purple-600"
					onClick={() => {
						handleVote("upvote", streamer._id, currentVote);
					}}
				>
					<img
						className="w-6 h-6"
						src={isUpvoted ? UpvoteArrowIcon : VoteArrowIcon}
						alt="arrow"
					/>
				</button>
				{streamer.votes}
				<button
					className="transition-colors hover:bg-orange-400"
					onClick={() => {
						handleVote("downvote", streamer._id, currentVote);
					}}
				>
					<img
						className="w-6 h-6 rotate-180"
						src={isDownvoted ? DownvoteArrowIcon : VoteArrowIcon}
						alt="arrow"
					/>
				</button>
			</div>
		</li>
	);
}
export default StreamerListItem;
