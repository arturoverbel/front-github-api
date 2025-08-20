import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

interface ApiResponse {
	access_token: string;
	status: string;
}

export default function Login() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const navigate = useNavigate();
	const host = process.env.REACT_APP_BACKEND_HOST || "http://localhost:3000";

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const res = await fetch(`${host}/session/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const data: ApiResponse = await res.json();
			if (data.status === "success" && data.access_token) {
				localStorage.setItem("jwt", data.access_token);
				navigate("/accounts");
			}
			else {
				throw new Error("Registration failed");
			}
		} catch (err) {
			alert("Login failed. Please check your credentials and try again.");
			console.error(err);
		}
	};

	return (
		<Form title="Login">
			<form onSubmit={handleLogin} className="space-y-4">
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
				/>
				<button
					type="submit"
					className="w-full rounded-md bg-green-600 py-2 text-white hover:bg-green-700"
				>
					Login
				</button>
			</form>
			<p className="text-center text-sm text-gray-600">
				Don’t have an account?{" "}
				<a href="/register" className="text-blue-600 hover:underline">
					Register
				</a>
			</p>

		</Form>
	);
}
