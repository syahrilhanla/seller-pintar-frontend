"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
	// Check if the user is authorized
	useEffect(() => {
		// Check if the user is authorized
		if (typeof window !== "undefined") {
			const user = localStorage.getItem("user");
			if (user) {
				redirect("/article");
			} else {
				redirect("/login");
			}
		}
	}, []);

	return null;
}
