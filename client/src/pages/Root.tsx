import SubmissionForm from "../components/SubmissionForm";

const Root = () => {
	return (
		<div className="min-h-screen bg-gray-900">
			<h1 className="py-4 text-4xl text-center text-white">
				Streamer Spotlight
			</h1>
			<div className="flex items-center justify-center w-full">
				<SubmissionForm />
			</div>
		</div>
	);
};
export default Root;
