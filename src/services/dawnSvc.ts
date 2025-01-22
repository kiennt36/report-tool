"use server";

import DawnSchema from "@/libs/Mongoose/schemas/dawnSchema";
import { Dawn } from "@/types/models";
import { revalidatePath } from "next/cache";

export const createDawn = async (data: Dawn) => {
	try {
		const dawnCreated = await DawnSchema.create(data);
		revalidatePath("/dawn");
		return JSON.stringify(dawnCreated);
	} catch (error: any) {
		console.error("error::", error.message);
	}
};

export const getDawns = async () => {
	try {
		const dawns: Dawn[] = await DawnSchema.find({});
		return JSON.stringify(dawns);
	} catch (error: any) {
		console.error("error::", error.message);
		return JSON.stringify([]);
	}
};
