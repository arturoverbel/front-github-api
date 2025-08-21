import React, { useState, FormEvent } from "react";
import "../styles/Register.css";

interface ApiResponse {
  access_token?: string;
  status: string;
}

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [registerError, setRegisterError] = useState<string | null>(null);
  const host = process.env.REACT_APP_BACKEND_HOST || "http://localhost:3000";

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setRegisterError(null);

    try {
      const res = await fetch(`${host}/session/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: ApiResponse = await res.json();

      if (res.ok && data.status === "success" && data.access_token) {
        localStorage.setItem("jwt", data.access_token);
        window.location.href = "/accounts"; 
      } else {
        const errorMessage = data.status === "error" ? "Registration failed. User may already exist." : "Registration failed. Please try again.";
        throw new Error(errorMessage);
      }
    } catch (err: any) {
      setRegisterError(err.message || "An unexpected error occurred during registration.");
      console.error("Register error:", err);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">
          Register
        </h2>

        {registerError && (
          <div className="register-error" role="alert">
            <span className="error-message-text">{registerError}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="register-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="register-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="register-input"
          />
          <button
            type="submit"
            className="register-button"
          >
            Register
          </button>
        </form>
        <p className="login-text">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="login-link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}