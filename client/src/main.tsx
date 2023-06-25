import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import "./index.css";
import Streamer from "./pages/Streamer";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
	},
	{
		path: "/streamer",
		element: <Streamer />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
