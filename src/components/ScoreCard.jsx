import { useState } from "react";

export default function ScoreCard({ results }) {
  const { score, categories } = results;
  const [openCategory, setOpenCategory] = useState(null);

  function getScoreClass(s) {
    if (s >= 80) return "score-excellent";
    if (s >= 60) return "score-good";
    if (s >= 40) return "score-average";
    return "score-poor";
  }

  function getBarColor(s) {
    if (s >= 80) return "#48bb78";
    if (s >= 60) return "#667eea";
    if (s >= 40) return "#ed8936";
    return "#fc8181";
  }

  function toggleCategory(name) {
    setOpenCategory((current) => (current === name ? null : name));
  }

  return (
    <div className="scorecard">
      <div className="scorecard-head">
        <div className={`overall-score ${getScoreClass(score)}`}>{score}</div>
        <div className="score-label">out of 100</div>
        <p className="score-subtitle">Detailed review of each evaluation area</p>
      </div>

      <div className="category-list">
        {categories.map((cat) => {
          const percent = (cat.score / cat.max) * 100;
          const isOpen = openCategory === cat.name;

          return (
            <div className="category-card" key={cat.name}>
              <button className="category-toggle" onClick={() => toggleCategory(cat.name)}>
                <div className="category-summary">
                  <span className="category-name">{cat.name}</span>
                  <span className="category-score">{cat.score}/{cat.max}</span>
                </div>
                <div className="category-meta">
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: `${percent}%`,
                        background: getBarColor(percent),
                      }}
                    />
                  </div>
                  <span className="toggle-icon">{isOpen ? "▼" : "▶"}</span>
                </div>
              </button>

              <div className={`category-details ${isOpen ? "open" : ""}`}>
                {cat.details?.map((detail, index) => (
                  <div className={`detail-item ${detail.type}`} key={`${cat.name}-${index}`}>
                    <span className="detail-icon">{detail.type === "success" ? "✓" : detail.type === "warning" ? "⚠" : "✗"}</span>
                    <span>{detail.text}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}