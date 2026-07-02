export default function FeedbackSection({ results }) {
  const feedback = results?.feedback ?? [];

  return (
    <section className="feedback-section">
      <h3>Feedback</h3>
      {feedback.length > 0 ? (
        <ul>
          {feedback.map((item, index) => (
            <li key={index} className="feedback-item">
              <div className="feedback-icon">{item.passed ? '✅' : '⚠️'}</div>
              <div className="feedback-text">
                <strong>{item.title}</strong>
                <span>{item.message}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Analyze a document to see feedback.</p>
      )}
    </section>
  );
}
