import React, { useState, FormEvent } from "react";
import "../styles/Login.css";

interface ApiResponse {
  access_token?: string;
  status: string;
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const host = process.env.REACT_APP_BACKEND_HOST || "http://localhost:3000";

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    try {
      const res = await fetch(`${host}/session/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: ApiResponse = await res.json();

      if (res.ok && data.status === "success" && data.access_token) {
        localStorage.setItem("jwt", data.access_token);
        window.location.href = "/accounts"; 
      } else {
        const errorMessage = data.status === "error" ? "Invalid credentials." : "Login failed. Please try again.";
        throw new Error(errorMessage);
      }
    } catch (err: any) {
      setLoginError(err.message || "An unexpected error occurred during login.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">
          Login
        </h2>

        {loginError && (
          <div className="login-error" role="alert">
            <span className="error-message-text">{loginError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>
        </form>
        <p className="register-text">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="register-link">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}