import { useState } from "react";
import { STREAMING_PLATFORMS } from "../constants";
import axios from "axios";
import Button from "./Button";

const SubmissionForm = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [platform, setPlatform] =
		useState<(typeof STREAMING_PLATFORMS)[number]>("Twitch");
	const [openDropdown, setOpenDropdown] = useState(false);

	const handleSubmit = async () => {
		try {
			axios.post(`${import.meta.env.VITE_API_URL}/streamers`, {
				name,
				description,
				platform,
			});
		} catch (error) {
			// handle error
		}
	};

	return (
		<form
			className="flex flex-col items-center justify-center gap-4 p-4 text-xl text-white bg-gray-800 rounded-md shadow-2xl w-fit"
			onSubmit={handleSubmit}
		>
			<label htmlFor="submissionName" className="flex flex-col">
				<p className="text-base">Streamer&apos;s name</p>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					id="submissionName"
					className="w-[300px] bg-slate-500 pl-2 py-2 rounded-md"
				/>
			</label>
			<label htmlFor="submissionDescription" className="flex flex-col">
				<p className="text-base">Description</p>
				<textarea
					id="submissionDescription"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="w-[300px] bg-slate-500 pl-2 py-2 rounded-md"
				/>
			</label>
			<div className="flex w-[300px] justify-between gap-4 items-center">
				<p>Streaming platform:</p>
				<button
					onClick={() => setOpenDropdown((prev) => !prev)}
					type="button"
					className="relative p-2 text-lg outline-1 outline-white outline rounded-xl"
					onBlur={(e) => {
						if (!e.currentTarget.contains(e.relatedTarget)) {
							setOpenDropdown(false);
						}
					}}
				>
					<div className="flex items-center justify-center gap-2">
						{platform}{" "}
						<img
							src="/arrow.png"
							className={`w-4 h-4 mt-1 transition-transform ${
								openDropdown && "rotate-180"
							}`}
						/>
					</div>
					<ul
						className={`absolute flex flex-col items-center justify-center mt-6 -translate-x-1/2 bg-gray-800 rounded-md left-1/2 top-full transition-transform origin-top border-[1px] border-white ${
							openDropdown ? "scale-y-100" : "scale-y-0"
						}`}
						aria-hidden={openDropdown ? "false" : "true"}
					>
						{STREAMING_PLATFORMS.map((plat) => (
							<li
								key={plat}
								className="w-full transition-colors rounded-md hover:bg-gray-700"
							>
								<div
									className="w-full h-full px-4 py-2"
									onClick={() => {
										setPlatform(plat);
									}}
									role="button"
									tabIndex={0}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											setPlatform(plat);
											setOpenDropdown(false);
										}
									}}
								>
									{plat}
								</div>
							</li>
						))}
					</ul>
				</button>
			</div>
			<Button type="submit" variant="filled" className="w-full text-lg">
				Add streamer
			</Button>
		</form>
	);
};
export default SubmissionForm;
