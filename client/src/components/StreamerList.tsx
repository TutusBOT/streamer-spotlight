import { streamer, streamerSchema } from "../pages/Streamer";
import { usePersistedState } from "../hooks/usePersistedState";
import { VOTES_LOCAL_STORAGE_KEY } from "../constants";
import axios from "axios";
import { useState } from "react";
import Error from "./Error";
import StreamerListItem from "./StreamerListItem";
interface streamerListProps {
	streamers?: streamer[];
	setStreamers: React.Dispatch<
		React.SetStateAction<
			| {
					_id: string;
					name: string;
					platform: "Twitch" | "YouTube" | "TikTok" | "Kick" | "Rumble";
					description: string;
					votes: number;
			  }[]
			| undefined
		>
	>;
}

function StreamerList({ streamers, setStreamers }: streamerListProps) {
	const [error, setError] = useState<null | string>(null);
	const [votes, setVotes] = usePersistedState<
		Array<{
			id: string;
			vote: "upvote" | "downvote";
		}>
	>(VOTES_LOCAL_STORAGE_KEY, []);

	const handleVote = async (
		vote: "upvote" | "downvote",
		id: string,
		currentVote: { id: string; vote: "upvote" | "downvote" } | undefined
	) => {
		let voteCount = 1;
		if (currentVote && vote !== currentVote.vote) {
			voteCount = 2;
			setVotes(
				votes.map((v) => {
					if (id === v.id) return { ...v, vote };
					return v;
				})
			);
		} else if (!currentVote) {
			setVotes((prevVotes) => [...prevVotes, { vote, id }]);
		} else {
			voteCount = -1;
			setVotes((prevVotes) => prevVotes.filter((v) => v.id !== id));
		}

		try {
			const { data } = await axios.put(
				`${import.meta.env.VITE_API_URL}/streamers/${id}/vote`,
				{ vote, count: voteCount }
			);
			const parsedStreamer = streamerSchema.parse(data);
			setStreamers((prevStreamers) =>
				prevStreamers?.map((streamer) => {
					return streamer._id === id ? parsedStreamer : streamer;
				})
			);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError(error.message);
			} else {
				setError("Unable to vote");
			}
		}
	};

	if (error) return <Error message={error} />;

	return (
		<ul className="grid w-full max-w-6xl grid-cols-1 py-4 text-white bg-gray-800 border-2 border-white shadow-2xl lg:grid-cols-2 lg:before:w-[1px] before:bg-white before:h-full before:absolute relative before:top-0 before:l-1/2 before:-translate-x-1/2 rounded-xl justify-items-center">
			{streamers?.map((streamer) => {
				const currentVote = votes.find((vote) => vote.id === streamer._id);
				return (
					<StreamerListItem
						key={streamer._id}
						streamer={streamer}
						currentVote={currentVote}
						handleVote={handleVote}
					/>
				);
			})}
		</ul>
	);
}
export default StreamerList;
