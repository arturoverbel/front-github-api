interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
}

export default function Repositories({ repos }: { repos: GitHubRepo[] }) {
  return (
    <div className="repo-grid">
      {repos.map((repo) => (
        <div key={repo.id}
          className="repo-card"
        >
          <div>
            <h3 className="repo-title">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </a>
            </h3>
            {repo.description && (
              <p className="repo-description">
                {repo.description}
              </p>
            )}
          </div>
          <div className="repo-meta">
            {repo.language && (
              <span className="language-tag">
                {repo.language}
              </span>
            )}
            <span className="stat-item">
              <span className="repo-stat-emoji">⭐</span> {repo.stargazers_count}
            </span>
            <span className="stat-item">
              <span className="repo-stat-emoji">🍴</span> {repo.forks_count}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}