import React, { useState, FormEvent } from "react";

import "../styles/Accounts.css";
import Profile from "../components/Profile";
import Repositories from "../components/Repositories";

interface GitHubUser {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
}

const Accounts: React.FC = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setUser(null);
    setRepos([]);
    setLoading(true);

    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) {
        if (userRes.status === 404) {
          throw new Error("User not found. Please check the username.");
        }
        throw new Error("Failed to fetch user data.");
      }
      const userData = await userRes.json();

      const reposRes = await fetch(`https://api.github.com/users/${username}/repos`);
      if (!reposRes.ok) {
        throw new Error("Failed to fetch repositories.");
      }
      const reposData = await reposRes.json();

      setUser(userData);
      setRepos(reposData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  return (
    <div className="app-container">
      <div className="page-header">
        <button
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>
      </div>

      <div className="main-card">
        <h1 className="main-title">
          GitHub Profile Viewer
        </h1>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="search-input"
          />
          <button
            type="submit"
            disabled={loading}
            className="search-button"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {loading && !user && !error && (
            <div className="loading-message">Loading user profile...</div>
        )}

        {user && (
            <Profile {...user} />
        )}

        {user && repos.length > 0 && (
            <h2 className="repo-section-title">
                Repositories ({repos.length})
            </h2>
        )}
        
        <Repositories repos={repos} />
        {user && repos.length === 0 && !loading && (
            <div className="no-repos-message">This user has no public repositories.</div>
        )}
      </div>
    </div>
  );
};

export default Accounts;