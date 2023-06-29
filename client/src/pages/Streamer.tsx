import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { STREAMING_PLATFORMS } from "../constants";
import Button from "../components/Button";
import z from "zod";

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
	const id = searchParams.get("id");

	const handleVote = async (vote: "upvote" | "downvote") => {
		const { data } = await axios.put(
			`${import.meta.env.VITE_API_URL}/streamers/${id}/vote`,
			{ vote }
		);
		const currentStreamer = streamerSchema.parse(data);
		setStreamer(currentStreamer);
	};

	useEffect(() => {
		if (!id) return;
		const fetchStreamer = async () => {
			const { data } = await axios.get(
				`${import.meta.env.VITE_API_URL}/streamers/${id}`
			);
			setStreamer(data);
		};
		fetchStreamer();
	}, [id]);

	if (!id)
		return (
			<div className="flex flex-col items-center justify-center min-h-screen gap-4 text-white bg-gray-900">
				<a
					href="/"
					className="text-xl text-white border-[1px] border-white py-2 px-4 rounded-xl hover:bg-white hover:text-black transition-colors"
				>
					Home
				</a>
				<p className="text-2xl bg-gray-950 border-[1px] border-red-700 rounded-xl p-4">
					Please provide a streamer ID.
				</p>
			</div>
		);

	return (
		<div className="grid min-h-screen text-white bg-gray-900 place-content-center">
			<a href="/" className="absolute text-2xl top-4 left-4">
				Home
			</a>
			{streamer != null && (
				<div className="flex flex-col gap-4 p-4 sm:p-8 rounded-xl w-fit bg-gray-950 sm:min-w-[500px]">
					<div className="flex items-center justify-between">
						<h2 className="text-2xl">{streamer.name}</h2>
						<div className="flex items-center justify-center">
							<Button
								type="button"
								variant="outlined"
								onClick={() => handleVote("upvote")}
							>
								Upvote
							</Button>
							{streamer.votes}
							<Button
								type="button"
								variant="outlined"
								onClick={() => handleVote("downvote")}
							>
								Downvote
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
