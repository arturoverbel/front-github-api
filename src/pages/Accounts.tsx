import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg border border-gray-300 bg-white p-8 shadow-sm">
        <h1 className="mb-4 text-2xl font-semibold text-gray-900">Welcome!</h1>
        <p className="mb-4 text-gray-700">You are authenticated 🎉</p>
        <button
          onClick={logout}
          className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
