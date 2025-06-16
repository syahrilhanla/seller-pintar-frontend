"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function AuthPage() {
	const handleSubmit = (type: "login" | "register") => {
		if (type === "register") {
			console.log("Registering");
		} else {
			console.log("Logging in");
		}
	};

	return (
		<div className="flex h-screen">
			{/* Branding Side */}
			<div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-200 to-slate-400 items-center justify-center p-10">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-slate-900/70 mb-4">
						Welcome to MySellerPintar.com
					</h1>
					<p className="text-lg text-slate-700 mb-6">
						"Share your stories, ideas, and insights with the world. Discover
						new perspectives every day."
					</p>
				</div>
			</div>

			{/* Form Side */}
			<div className="w-full lg:w-1/2 flex items-center justify-center p-8">
				<div className="w-full max-w-md">
					<Tabs defaultValue="login" className="w-full">
						<TabsList className="grid w-full grid-cols-2 mb-6">
							<TabsTrigger value="login">Login</TabsTrigger>
							<TabsTrigger value="register">Register</TabsTrigger>
						</TabsList>

						<TabsContent value="login">
							<form
								onSubmit={(e) => {
									e.preventDefault();
									handleSubmit("login");
								}}
								className="space-y-4"
							>
								<Input name="email" placeholder="Email" />
								<Input type="password" name="password" placeholder="Password" />
								<Button type="submit" className="w-full">
									Login
								</Button>
							</form>
						</TabsContent>

						<TabsContent value="register">
							<form
								onSubmit={(e) => {
									e.preventDefault();
									handleSubmit("register");
								}}
								className="space-y-4"
							>
								<Input name="name" placeholder="Full Name" />
								<Input name="email" placeholder="Email" />
								<Input type="password" name="password" placeholder="Password" />
								<Input
									type="password"
									name="confirmPassword"
									placeholder="Confirm Password"
								/>
								<Button type="submit" className="w-full">
									Register
								</Button>
							</form>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
