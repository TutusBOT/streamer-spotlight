import { useEffect, useState } from "react";
import StreamerList from "../components/StreamerList";
import SubmissionForm from "../components/SubmissionForm";
import axios from "axios";
import z from "zod";
import { streamerSchema } from "./Streamer";

const streamersSchema = z.array(streamerSchema);

type streamers = z.infer<typeof streamersSchema>;

const Root = () => {
	const [streamers, setStreamers] = useState<undefined | streamers>();

	useEffect(() => {
		axios.get(`${import.meta.env.VITE_API_URL}/streamers`).then((res) => {
			const parsedStreamers = streamersSchema.parse(res.data);
			setStreamers(parsedStreamers);
		});
	}, []);

	return (
		<div className="min-h-screen py-16 bg-gray-900">
			<h1 className="text-4xl text-center text-white">Streamer Spotlight</h1>
			<div className="flex items-center justify-center w-full mt-16">
				<SubmissionForm />
			</div>
			<div className="w-full max-w-6xl h-[1px] mx-auto mt-16 bg-purple-600"></div>
			<div className="flex flex-col items-center justify-center gap-4 px-4 mt-16 sm:px-8">
				<h3 className="text-2xl text-white">Streamers</h3>
				<StreamerList streamers={streamers} />
			</div>
		</div>
	);
};
export default Root;
