import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
	username: z.string().min(2, "Username must be at least 2 characters"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmitLogin: SubmitHandler<LoginFormData> = async (data) => {
		new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

		try {
			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, data);

			toast.success("Login successful!");
			router.push("/articles");
		} catch (error) {
			const errorMessage = axios.isAxiosError(error)
				? error.response?.data.error
				: error;

			if (errorMessage) {
				toast.error(errorMessage);
			} else {
				toast.error("Login failed. Please try again later.");
			}
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmitLogin)} className="space-y-4">
			<div className="space-y-2">
				<Input {...register("username")} placeholder="Username" />
				{errors.username && (
					<p className="text-red-500 text-sm">{errors.username.message}</p>
				)}
			</div>
			<div className="space-y-2">
				<Input
					{...register("password")}
					placeholder="Password"
					type="password"
				/>
				{errors.password && (
					<p className="text-red-500 text-sm">{errors.password.message}</p>
				)}
			</div>

			<Button
				disabled={isSubmitting}
				type="submit"
				className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
			>
				Login
			</Button>
		</form>
	);
}
