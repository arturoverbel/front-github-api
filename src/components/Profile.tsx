interface GitHubUser {
    avatar_url: string;
    name: string;
    login: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
  }

export default function Profile(user: GitHubUser) {
    return <div className="user-profile">
    <img
      src={user.avatar_url}
      alt={user.login}
      className="avatar"
    />
    <div className="profile-info">
      <h2 className="profile-name">{user.name || user.login}</h2>
      <p className="profile-login">@{user.login}</p>
      {user.bio && (
        <p className="profile-bio">
          {user.bio}
        </p>
      )}
      <div className="profile-stats">
        <span className="stat-item">
          <span className="stat-emoji">👥</span> {user.followers} followers
        </span>
        <span className="stat-item">
          <span className="stat-emoji">🚶</span> {user.following} following
        </span>
        <span className="stat-item">
          <span className="stat-emoji">📚</span> {user.public_repos} public repos
        </span>
      </div>
    </div>
  </div>
}