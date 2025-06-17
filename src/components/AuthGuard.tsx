"use client";
import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useReadLocalStorage } from "usehooks-ts";

type User = {
	role: "Admin" | "User";
	token: string;
};

interface Props {
	children: ReactNode;
	role: User["role"];
}

export default function AuthGuard({ children, role }: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const user: User | null = useReadLocalStorage("user");

	// Define allowed paths for each role
	const userAllowed = ["/article", "/profile"];
	const adminAllowed = [
		"/admin",
		"/admin/profile",
		"/admin/article-form",
		"/admin/category",
	];

	useEffect(() => {
		if (!user || user.role !== role) {
			router.replace("/login");
			return;
		}

		if (user.role === "User") {
			// User can only access /article (+subpath) and /profile
			const allowed = userAllowed.some((path) => pathname.startsWith(path));
			if (!allowed) {
				router.replace("/article");
			}
		}

		if (user.role === "Admin") {
			// Admin can only access /admin features
			const allowed = adminAllowed.some((path) => pathname.startsWith(path));
			if (!allowed) {
				router.replace("/admin");
			}
		}
	}, [router, user, role, pathname]);

	return <>{children}</>;
}
