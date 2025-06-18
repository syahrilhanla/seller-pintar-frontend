import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Syahril Hanla | Blog Genzet",
	description:
		"Blog Genzet; The Journal : Design Resources, Interviews, and Industry News",
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.variable} font-sans antialiased m-0 p-0`}>
				<main>{children}</main>
				<Toaster richColors />
			</body>
		</html>
	);
}
