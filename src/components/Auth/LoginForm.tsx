"use client";

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { LoaderCircle } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useLocalStorage } from "usehooks-ts";
import { User } from "@/types/user.type";

const loginSchema = z.object({
	username: z.string().min(1, "Please enter your username"),
	password: z.string().min(8, "Please enter your password"),
});

const registerSchema = z.object({
	username: z.string().min(1, "Username field cannot be empty"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
	role: z
		.string({ required_error: "Role is required" })
		.min(1, "Role is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function LoginForm() {
	const [formState, setFormState] = useState<"login" | "register">("login");
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const [userData, setUserData] = useLocalStorage<User | null>("user", null);

	const schema = formState === "register" ? registerSchema : loginSchema;

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm<LoginFormData | RegisterFormData>({
		resolver: zodResolver(schema),
	});

	const onSubmitLogin: SubmitHandler<LoginFormData | RegisterFormData> = async (
		payload
	) => {
		try {
			if (formState === "login") {
				const { data } = await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
					payload
				);

				toast.success("Login successful!");

				// save user data to localStorage
				setUserData({
					username: payload.username,
					role: data.role,
					password: payload.password, // store password for profile page
					token: data.token,
				});

				if (data.role === "Admin") {
					router.push("/admin");
				} else {
					router.push("/article");
				}
			} else {
				const { username, password, role } = payload as RegisterFormData;

				const registerPayload = {
					username,
					password,
					role,
				};

				await axios.post(
					`${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
					registerPayload
				);

				toast.success("Registration successful! You can now log in.");
				setFormState("login");
			}
		} catch (error) {
			const errorMessage = axios.isAxiosError(error)
				? error.response?.data.error
				: error;

			toast.error(errorMessage);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmitLogin)} className="space-y-3">
			<div className="space-y-2">
				<Label htmlFor="username">Username</Label>
				<Input {...register("username")} id="username" placeholder="Username" />
				{errors.username && (
					<p className="text-red-500 text-sm">{errors.username.message}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="password">Password</Label>
				<div className="relative">
					<Input
						{...register("password")}
						id="password"
						placeholder="Password"
						type={showPassword ? "text" : "password"}
						className="pr-10"
					/>
					<button
						type="button"
						onClick={() => setShowPassword((prev) => !prev)}
						className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-500 hover:text-slate-700 focus:outline-none"
					>
						{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
					</button>
				</div>
				{errors.password && (
					<p className="text-red-500 text-sm">{errors.password.message}</p>
				)}
			</div>

			{formState === "register" && (
				<div className="space-y-2">
					<Label htmlFor="role">Select Role</Label>
					<Select
						onValueChange={(value) =>
							setValue("role", value, { shouldValidate: true })
						}
					>
						<SelectTrigger className="w-full border border-slate-300 bg-white text-slate-700 hover:border-slate-400 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 rounded-md shadow-sm cursor-pointer">
							<SelectValue placeholder="Select Role" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Roles</SelectLabel>
								<SelectItem value="Admin">Admin</SelectItem>
								<SelectItem value="User">User</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>

					{"role" in errors && errors.role && (
						<p className="text-red-500 text-sm">{errors.role.message}</p>
					)}
				</div>
			)}

			<Button
				disabled={isSubmitting || isSubmitSuccessful}
				type="submit"
				variant={"default"}
				className="w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-center my-4"
			>
				{isSubmitting || isSubmitSuccessful ? (
					<>
						<LoaderCircle className="animate-spin" />
					</>
				) : formState === "login" ? (
					"Login"
				) : (
					"Register"
				)}
			</Button>

			{formState === "login" ? (
				<p className="mt-2 text-sm text-center text-slate-600">
					{`Don't have an account? `}
					<span
						onClick={() => setFormState("register")}
						className="text-blue-500 cursor-pointer hover:underline"
					>
						Register
					</span>
				</p>
			) : (
				<p className="mt-2 text-sm text-center text-slate-600">
					Already have an account?{" "}
					<span
						onClick={() => setFormState("login")}
						className="text-blue-500 cursor-pointer hover:underline"
					>
						Login
					</span>
				</p>
			)}
		</form>
	);
}
