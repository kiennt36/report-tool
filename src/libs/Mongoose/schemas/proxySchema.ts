import mongoose from "mongoose";
const Schema = mongoose.Schema;

const proxySchema = new Schema(
	{
		ipAddress: String,
		v: { type: Number, enum: [4, 6] },
		status: { type: Number, enum: [0, 1, 2] },
	},
	{ timestamps: true }
);

export default mongoose.model("Proxies", proxySchema);
