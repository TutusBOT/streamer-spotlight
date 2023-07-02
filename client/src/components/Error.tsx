import Navbar from "./Navbar";

function Error({ message }: { message: string }) {
	return (
		<div className="w-screen h-screen text-2xl text-white bg-gray-900">
			<Navbar />
			<p className="absolute text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-gray-950 border-[1px] border-red-700 rounded-xl p-4">
				Something went wrong. <br />
				{message}
			</p>
		</div>
	);
}
export default Error;
