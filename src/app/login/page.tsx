"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import LoginForm from "@/components/Login/LoginForm";
import RegisterForm from "@/components/Login/RegisterForm";

export default function AuthPage() {
	return (
		<div className="flex h-screen">
			{/* Branding Side */}
			<div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-200 to-slate-400 items-center justify-center p-10">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-slate-900/70 mb-4">
						Welcome to MySellerPintar.com
					</h1>
					<p className="text-lg text-slate-700 mb-6">
						{`"Share your stories"`}
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
							<LoginForm />
						</TabsContent>

						<TabsContent value="register">
							<RegisterForm />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
