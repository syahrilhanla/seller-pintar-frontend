import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const registerSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
	confirmPassword: z
		.string()
		.min(8, "Confirm Password must be at least 8 characters"),
});

export default function RegisterForm() {
	const {
		register: registerRegister,
		handleSubmit: handleSubmitRegister,
		formState: { errors: registerErrors, isSubmitting: isRegistering },
	} = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmitRegister = (data: any) => {
		console.log("Register form submitted:", data);
	};

	return (
		<form
			onSubmit={handleSubmitRegister(onSubmitRegister)}
			className="space-y-4"
		>
			<div className="space-y-2">
				<Input {...registerRegister("name")} placeholder="Full Name" />
				{registerErrors.name && (
					<p className="text-red-500 text-sm">{registerErrors.name.message}</p>
				)}
			</div>

			<div className="space-y-2">
				<Input {...registerRegister("email")} placeholder="Email" />
				{registerErrors.email && (
					<p className="text-red-500 text-sm">{registerErrors.email.message}</p>
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
	);
}
