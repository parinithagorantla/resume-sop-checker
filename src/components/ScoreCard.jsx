export default function ScoreCard({ results }) {
  const { score, categories } = results;

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

  return (
    <div className="scorecard">
      <div className={`overall-score ${getScoreClass(score)}`}>{score}</div>
      <div className="score-label">out of 100</div>

      {categories.map((cat) => (
        <div className="category" key={cat.name}>
          <div className="category-header">
            <span className="category-name">{cat.name}</span>
            <span className="category-score">{cat.score}/{cat.max}</span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{
                width: `${(cat.score / cat.max) * 100}%`,
                background: getBarColor((cat.score / cat.max) * 100),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}