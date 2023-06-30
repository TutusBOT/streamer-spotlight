import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { STREAMING_PLATFORMS } from "../constants";
import Button from "../components/Button";
import z from "zod";
import Navbar from "../components/Navbar";
import Error from "../components/Error";

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
	const id = searchParams.get("id");

	const handleVote = async (vote: "upvote" | "downvote") => {
		try {
			const { data } = await axios.put(
				`${import.meta.env.VITE_API_URL}/streamers/${id}/vote`,
				{ vote }
			);
			const currentStreamer = streamerSchema.parse(data);
			setStreamer(currentStreamer);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError(error.message);
			} else {
				setError("Unable to ");
			}
		}
	};

	useEffect(() => {
		if (!id) return setError("Please provide a streamer ID.");
		axios
			.get(`${import.meta.env.VITE_API_URL}/streamers/${id}`)
			.then((res) => {
				const currentStreamer = streamerSchema.parse(res.data);
				setStreamer(currentStreamer);
			})
			.catch((error) => setError(error.message));
	}, [id]);

	if (error) return <Error message={error} />;

	return (
		<div className="grid min-h-screen text-white bg-gray-900 place-content-center">
			<Navbar />
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
