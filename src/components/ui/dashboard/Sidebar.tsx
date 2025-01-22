import Link from "next/link";

export default function Sidebar() {
	return (
		<div>
			<ul className="menu rounded-box w-56">
				<li>
					<Link href="/">Dashboard</Link>
				</li>
				<li>
					<details open>
						<summary>Report</summary>
						<ul>
							<li>
								<Link href="/dawn">Dawn</Link>
							</li>
						</ul>
					</details>
				</li>
				<li>
					<a>Settings</a>
				</li>
			</ul>
		</div>
	);
}
