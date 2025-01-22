"use client";

import { Table } from "@/components/ui/dawn";
import { createDawn, getDawns } from "@/services/dawnSvc";
import { Dawn } from "@/types/models";
import { useEffect, useState } from "react";

export default function page() {
	const [dawns, setDawns] = useState<Dawn[]>([]);

	const getDawnsAsync = async () => {
		const res = await getDawns();
		const parsedRes = JSON.parse(res) as Dawn[];
		setDawns(parsedRes);
	};

	const handleImportEmail = async () => {
		const dawn: Dawn = {
			email: "kientrungngo113@gmail.com",
		};
		const res = await createDawn(dawn);
		console.log("res::", res);
	};

	useEffect(() => {
		getDawnsAsync();
	}, []);

	return (
		<div className="flex flex-col items-stretch justify-start gap-6">
			<div className="flex items-center justify-end gap-3">
				<button className="btn btn-primary" onClick={handleImportEmail}>
					Import Excel
				</button>
				<button className="btn btn-accent">Export Excel</button>
			</div>
			<Table dataSource={dawns} />
		</div>
	);
}
