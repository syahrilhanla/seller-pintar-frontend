import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmitLogin = (data: any) => {
		console.log("Login form submitted:", data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmitLogin)} className="space-y-4">
			<div className="space-y-2">
				<Input {...register("email")} placeholder="Email" />
				{errors.email && (
					<p className="text-red-500 text-sm">{errors.email.message}</p>
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

			<Button type="submit" className="w-full">
				Login
			</Button>
		</form>
	);
}
