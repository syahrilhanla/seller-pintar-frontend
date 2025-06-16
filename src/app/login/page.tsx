import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "@/components/Login/LoginForm";

export default function AuthPage() {
	return (
		<div className="flex h-screen bg-[#F3F4F6]">
			<div className="w-full flex items-center justify-center md:p-8">
				<Card className="w-full h-[100dvh] md:block flex items-center justify-center md:h-fit px-0 md:max-w-md shadow-none border-none">
					<div className="w-full">
						<Image
							src="/Frame.svg"
							alt="Logo"
							width={150}
							height={50}
							className="mx-auto my-2"
						/>

						<CardContent className="md:px-4">
							<LoginForm />
						</CardContent>
					</div>
				</Card>
			</div>
		</div>
	);
}
