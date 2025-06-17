import { User } from "@/types/user.type";
import Link from "next/link";

interface Props {
	userData: User;
	role: "Admin" | "User";
}

const Profile = ({ userData, role }: Props) => {
	return (
		<div className="max-w-lg mx-auto flex justify-center items-center">
			<div className="w-full flex flex-col items-center justify-center px-4 py-8">
				<div className="text-xl font-semibold mb-8">User Profile</div>

				<div className="w-24 h-24 rounded-full bg-blue-200 flex items-center justify-center text-blue-900 font-medium text-3xl mb-6">
					J
				</div>

				<div className="space-y-3 w-full">
					<div className="bg-gray-100 rounded-lg px-4 py-2 grid grid-cols-[3fr_0.3fr_8fr] justify-between place-content-between text-sm">
						<span className="text-gray-900 font-medium">Username </span>:
						<span className="text-slate-900 text-center">
							{userData.username}
						</span>
					</div>
					<div className="bg-gray-100 rounded-lg px-4 py-2 grid grid-cols-[3fr_0.3fr_8fr] justify-between place-content-between text-sm">
						<span className="text-gray-900 font-medium">Password </span>:
						<span className="text-slate-900 text-center">
							{userData.password}
						</span>
					</div>
					<div className="bg-gray-100 rounded-lg px-4 py-2 grid grid-cols-[3fr_0.3fr_8fr] justify-between place-content-between text-sm">
						<span className="text-gray-900 font-medium">Role </span>:
						<span className="text-slate-900 text-center">{userData.role}</span>
					</div>
				</div>

				<Link
					href={role === "Admin" ? "/admin" : "/article"}
					className="mt-12 w-full py-2 px-4 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition-colors"
				>
					Back to {role === "Admin" ? "Dashboard" : "home"}
				</Link>
			</div>
		</div>
	);
};

export default Profile;
