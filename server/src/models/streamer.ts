import { Schema, model, models } from "mongoose";

const STREAMING_PLATFORMS = ["Twitch", "YouTube", "TikTok", "Kick", "Rumble"];

const schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	platform: {
		type: String,
		enum: STREAMING_PLATFORMS,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	votes: {
		type: Number,
		default: 0,
	},
});

const Streamer = models.Streamer || model("Streamer", schema);

export default Streamer;
