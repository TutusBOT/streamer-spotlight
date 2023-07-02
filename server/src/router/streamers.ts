import express from "express";
import Streamer from "../models/streamer";

export default (router: express.Router) => {
	router.post("/streamers", postStreamer);
	router.get("/streamers", getStreamers);
	router.get("/streamers/:id", getStreamerById);
	router.put("/streamers/:id/vote", putVote);
};

const postStreamer = async (req: express.Request, res: express.Response) => {
	try {
		const streamer = await Streamer.create(req.body);
		return res.json(streamer);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const getStreamers = async (req: express.Request, res: express.Response) => {
	try {
		const streamers = await Streamer.find({}).lean();
		return res.json(streamers);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const getStreamerById = async (req: express.Request, res: express.Response) => {
	try {
		const streamer = await Streamer.findById(req.params.id);
		return res.json(streamer);
	} catch (error) {
		return res.status(400).json(error);
	}
};

const putVote = async (req: express.Request, res: express.Response) => {
	try {
		const { vote, count } = req.body;
		const id = req.params.id;
		const streamer = await Streamer.findById(id);
		let currentVotes = streamer.votes;
		if (vote === "upvote") currentVotes += count || 1;
		if (vote === "downvote") currentVotes -= count || 1;
		const currentStreamer = await Streamer.findByIdAndUpdate(
			id,
			{ votes: currentVotes },
			{ upsert: true, new: true }
		);
		return res.json(currentStreamer);
	} catch (error) {
		return res.status(400).json(error);
	}
};
