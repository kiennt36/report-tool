"use client";

import { Dawn } from "@/types/models";
import dayjs from "dayjs";

export default function Table({ dataSource }: { dataSource: Dawn[] }) {
	return (
		<div className="overflow-x-auto">
			<table className="table table-zebra table-pin-rows table-pin-cols">
				<thead>
					<tr>
						<th></th>
						<th>App Id</th>
						<th>Email</th>
						<td>Ngày cập nhật</td>
						<th>Points</th>
						<th>Register Points</th>
						<th>Signin Points</th>
						<th>Twitter Points</th>
						<th>Discord Points</th>
						<th>Telegram Points</th>
						<th>Bonus Points</th>
						<th>Epoch01 Points</th>
						<th>Refferal Points</th>
						<th>Total Points</th>
						<td>Status</td>
					</tr>
				</thead>
				<tbody>
					{dataSource.map((dawn: Dawn, index: number) => (
						<tr key={dawn._id}>
							<th>{index + 1}</th>
							<td>{dawn.appId}</td>
							<td>{dawn.email}</td>
							<td>
								{dayjs(dawn.updatedAt).format("DD/MM/YYYY")}
							</td>
							<td>{dawn.points}</td>
							<td>{dawn.registerPoints}</td>
							<td>{dawn.signinPoints}</td>
							<td>{dawn.twitterPoints}</td>
							<td>{dawn.discordPoints}</td>
							<td>{dawn.telegramPoints}</td>
							<td>{dawn.bonusPoints}</td>
							<td>{dawn.epoch01Points}</td>
							<td>{dawn.refferalPoints}</td>
							<td>{dawn.totalPoints}</td>
							<td>{dawn.status}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
