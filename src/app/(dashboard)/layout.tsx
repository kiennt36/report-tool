import { Footer, Navbar, Sidebar } from "@/ui/dashboard";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen h-screen">
			<div className="flex flex-col h-full">
				<div>
					<Navbar />
				</div>
				<div className="flex-1 flex h-[calc(100%-116px)]">
					<div className="bg-base-200">
						<Sidebar />
					</div>
					<main className="flex-grow overflow-x-hidden overflow-y-auto">
						<div className="p-6">{children}</div>
					</main>
				</div>
				<div>
					<Footer />
				</div>
			</div>
		</div>
	);
}
