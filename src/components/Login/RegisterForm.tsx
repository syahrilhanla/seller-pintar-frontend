import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";

import { LoaderCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const registerSchema = z
	.object({
		username: z.string().min(2, "Name must be at least 2 characters"),
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z
			.string()
			.min(8, "Confirm Password must be at least 8 characters"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords must match",
		path: ["confirmPassword"],
	});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
	const {
		register: registerRegister,
		handleSubmit: handleSubmitRegister,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmitRegister = async (data: RegisterFormData) => {
		const { username, password, confirmPassword } = data;

		const registerPayload = {
			username,
			password,
			role: "User",
		};

		console.log("Register Payload:", registerPayload);

		try {
			await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
				registerPayload
			);

			toast.success("Registration successful! You can now log in.");
		} catch (error) {
			const errorMessage = axios.isAxiosError(error)
				? error.response?.data.error
				: "Registration failed. Please try again later.";

			toast.error(errorMessage);
		}
	};

	return (
		<form
			onSubmit={handleSubmitRegister(onSubmitRegister)}
			className="space-y-4"
		>
			<div className="space-y-2">
				<Input {...registerRegister("username")} placeholder="Username" />
				{errors.username && (
					<p className="text-red-500 text-sm">{errors.username.message}</p>
				)}
			</div>

			<div className="space-y-2">
				<Input
					{...registerRegister("password")}
					type="password"
					placeholder="Password"
				/>
				{errors.password && (
					<p className="text-red-500 text-sm">{errors.password.message}</p>
				)}
			</div>

			<div className="space-y-2">
				<Input
					{...registerRegister("confirmPassword")}
					type="password"
					placeholder="Confirm Password"
				/>
				{errors.confirmPassword && (
					<p className="text-red-500 text-sm">
						{errors.confirmPassword.message}
					</p>
				)}
			</div>
			<Button
				disabled={isSubmitting}
				type="submit"
				className="w-full disabled:opacity-50 disabled:cursor-not-allowed text-center"
			>
				{isSubmitting ? (
					<>
						<LoaderCircle className="animate-spin" />
					</>
				) : (
					"Register"
				)}
			</Button>
		</form>
	);
}
