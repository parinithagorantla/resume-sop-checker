import { useState, useEffect } from "react";
import TabSwitcher from "./components/TabSwitcher";
import FileUploader from "./components/FileUploader";
import ScoreCard from "./components/ScoreCard";
import FeedbackSection from "./components/FeedbackSection";
import { extractText } from "./utils/extractText";
import { scoreResume } from "./utils/resumeScorer";
import { scoreCV } from "./utils/cvScorer";
import { scoreSOP } from "./utils/sopScorer";

export default function App() {
  const [activeTab, setActiveTab] = useState("resume");
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [file, activeTab]);

  async function handleAnalyze() {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const text = await extractText(file);
      if (!text || !text.trim()) {
        throw new Error("Could not extract text from this file. Please upload a PDF or DOCX file.");
      }
      const scored = activeTab === "resume"
        ? scoreResume(text)
        : activeTab === "cv"
          ? scoreCV(text)
          : scoreSOP(text);
      setResults(scored);
    } catch (err) {
      setError(err?.message || "Failed to analyze file. Please try a PDF or DOCX.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="header">
        <h1>📄 Resume, SOP & Cover Letter Checker</h1>
        <p>Upload your document and get an instant strength score</p>
      </div>

      <div className="container">
        <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
        <FileUploader file={file} setFile={setFile} activeTab={activeTab} />

        <button
          className="analyze-btn"
          onClick={handleAnalyze}
          disabled={!file || loading}
        >
          {loading ? "⏳ Analyzing..." : file ? `✨ Analyze My ${activeTab === "resume" ? "Resume" : activeTab === "cv" ? "CV" : "SOP"}` : "Upload a file first"}
        </button>

        {error && <div className="error-message">{error}</div>}
        {results && <ScoreCard results={results} />}
        {results && <FeedbackSection results={results} />}
      </div>
    </>
  );
}