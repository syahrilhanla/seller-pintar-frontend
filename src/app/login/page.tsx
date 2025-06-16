"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define validation schemas
const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

const registerSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
	confirmPassword: z
		.string()
		.min(8, "Confirm Password must be at least 8 characters"),
});

export default function AuthPage() {
	// login form
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
	});

	// register form
	const {
		register: registerRegister,
		handleSubmit: handleSubmitRegister,
		formState: { errors: registerErrors, isSubmitting: isRegistering },
	} = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmitLogin = (data: any) => {
		console.log("Form submitted:", data);
	};

	const onSubmitRegister = (data: any) => {
		console.log("Register form submitted:", data);
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
							<form
								onSubmit={handleSubmit(onSubmitLogin)}
								className="space-y-4"
							>
								<div className="space-y-2">
									<Input {...register("email")} placeholder="Email" />
									{errors.email && (
										<p className="text-red-500 text-sm">
											{errors.email.message}
										</p>
									)}
								</div>
								<div className="space-y-2">
									<Input
										{...register("password")}
										placeholder="Password"
										type="password"
									/>
									{errors.password && (
										<p className="text-red-500 text-sm">
											{errors.password.message}
										</p>
									)}
								</div>

								<Button type="submit" className="w-full">
									Login
								</Button>
							</form>
						</TabsContent>

						<TabsContent value="register">
							<form
								onSubmit={handleSubmitRegister(onSubmitRegister)}
								className="space-y-4"
							>
								<div className="space-y-2">
									<Input
										{...registerRegister("name")}
										placeholder="Full Name"
									/>
									{registerErrors.name && (
										<p className="text-red-500 text-sm">
											{registerErrors.name.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Input {...registerRegister("email")} placeholder="Email" />
									{registerErrors.email && (
										<p className="text-red-500 text-sm">
											{registerErrors.email.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Input
										{...registerRegister("password")}
										type="password"
										placeholder="Password"
									/>
									{registerErrors.password && (
										<p className="text-red-500 text-sm">
											{registerErrors.password.message}
										</p>
									)}
								</div>

								<div className="space-y-2">
									<Input
										{...registerRegister("confirmPassword")}
										type="password"
										placeholder="Confirm Password"
									/>
									{registerErrors.confirmPassword && (
										<p className="text-red-500 text-sm">
											{registerErrors.confirmPassword.message}
										</p>
									)}
								</div>
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
