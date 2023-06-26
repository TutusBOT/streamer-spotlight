import express from "express";
import streamers from "./streamers";

const router = express.Router();

export default (): express.Router => {
	streamers(router);
	return router;
};
