import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { STREAMING_PLATFORMS, VOTES_LOCAL_STORAGE_KEY } from "../constants";
import Button from "../components/Button";
import z from "zod";
import Navbar from "../components/Navbar";
import Error from "../components/Error";
import { usePersistedState } from "../hooks/usePersistedState";
import VoteArrowIcon from "../icons/vote-arrow.svg";
import DownvoteArrowIcon from "../icons/downvote-arrow.svg";
import UpvoteArrowIcon from "../icons/upvote-arrow.svg";

export const streamerSchema = z.object({
	_id: z.string(),
	name: z.string(),
	platform: z.enum(STREAMING_PLATFORMS),
	description: z.string(),
	votes: z.number().int(),
});

export type streamer = z.infer<typeof streamerSchema>;

const Streamer = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [streamer, setStreamer] = useState<null | streamer>(null);
	const [error, setError] = useState<null | string>(null);
	const [votes, setVotes] = usePersistedState<
		Array<{
			id: string;
			vote: "upvote" | "downvote";
		}>
	>(VOTES_LOCAL_STORAGE_KEY, []);
	const [currentVote, setCurrentVote] = useState<null | {
		id: string;
		vote: "upvote" | "downvote";
	}>(null);
	const id = searchParams.get("id");
	if (!id) return setError("Please provide a streamer ID.");

	const handleVote = async (vote: "upvote" | "downvote") => {
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
			setVotes([...votes, { vote, id }]);
		} else {
			voteCount = -1;
			setVotes(votes.filter((v) => v.id !== id));
		}

		try {
			const { data } = await axios.put(
				`${import.meta.env.VITE_API_URL}/streamers/${id}/vote`,
				{ vote, count: voteCount }
			);
			const currentStreamer = streamerSchema.parse(data);

			setStreamer(currentStreamer);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError(error.message);
			} else {
				setError("Unable to vote");
			}
		}
	};

	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_API_URL}/streamers/${id}`)
			.then((res) => {
				const currentStreamer = streamerSchema.parse(res.data);
				setStreamer(currentStreamer);
			})
			.catch((error) => setError(error.message));
	}, [id]);

	useEffect(() => {
		setCurrentVote(votes.find((vote) => vote.id === id) || null);
	}, [votes]);

	if (error) return <Error message={error} />;

	return (
		<div className="grid min-h-screen px-2 text-white bg-gray-900 place-content-center">
			<Navbar />
			{streamer != null && (
				<div className="flex flex-col gap-4 p-4 sm:p-8 rounded-xl w-fit bg-gray-950 sm:min-w-[500px]">
					<div className="flex items-center justify-between">
						<h2 className="text-2xl">{streamer.name}</h2>
						<div className="flex items-center justify-center gap-4 text-2xl">
							<Button
								type="button"
								variant="outlined"
								onClick={() => handleVote("upvote")}
							>
								<img
									className="w-6 h-6"
									src={
										currentVote?.vote === "upvote"
											? UpvoteArrowIcon
											: VoteArrowIcon
									}
									alt="arrow"
								/>
							</Button>
							{streamer.votes}
							<Button
								type="button"
								variant="outlined"
								onClick={() => handleVote("downvote")}
								className="hover:bg-orange-400"
							>
								<img
									className="w-6 h-6 rotate-180"
									src={
										currentVote?.vote === "downvote"
											? DownvoteArrowIcon
											: VoteArrowIcon
									}
									alt="arrow"
								/>
							</Button>
						</div>
					</div>
					<img src="streamer.png" alt={streamer.name} />
					<p>{streamer.description}</p>
				</div>
			)}
		</div>
	);
};
export default Streamer;
