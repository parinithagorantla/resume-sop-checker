import { useState } from "react";
import TabSwitcher from "./components/TabSwitcher";
import FileUploader from "./components/FileUploader";
import ScoreCard from "./components/ScoreCard";
import FeedbackSection from "./components/FeedbackSection";
import { extractText } from "./utils/extractText";
import { scoreResume } from "./utils/resumeScorer";
import { scoreCV } from "./utils/cvScorer";
import { scoreSOP } from "./utils/sopScorer";

const EMPTY_TAB_STATE = {
  file: null,
  results: null,
  error: null,
  loading: false,
};

export default function App() {
  const [activeTab, setActiveTab] = useState("resume");
  const [tabStates, setTabStates] = useState({
    resume: { ...EMPTY_TAB_STATE },
    cv: { ...EMPTY_TAB_STATE },
    sop: { ...EMPTY_TAB_STATE },
  });
  const [uploadResetKey, setUploadResetKey] = useState(0);

  const currentState = tabStates[activeTab];

  function handleTabChange(nextTab) {
    if (nextTab === activeTab) return;

    setActiveTab(nextTab);
    setUploadResetKey((value) => value + 1);
    setTabStates({
      resume: { ...EMPTY_TAB_STATE },
      cv: { ...EMPTY_TAB_STATE },
      sop: { ...EMPTY_TAB_STATE },
    });
  }

  function updateCurrentTabState(updater) {
    setTabStates((current) => ({
      ...current,
      [activeTab]: updater(current[activeTab]),
    }));
  }

  function handleFileSelect(file) {
    updateCurrentTabState((state) => ({
      ...state,
      file,
      error: null,
      results: null,
    }));
  }

  async function handleAnalyze() {
    if (!currentState.file) return;

    updateCurrentTabState((state) => ({
      ...state,
      loading: true,
      error: null,
      results: null,
    }));

    try {
      const text = await extractText(currentState.file);
      if (!text || !text.trim()) {
        throw new Error("Could not extract text from this file. Please upload a PDF or DOCX file.");
      }

      const scored = activeTab === "resume"
        ? scoreResume(text)
        : activeTab === "cv"
          ? scoreCV(text)
          : scoreSOP(text);

      updateCurrentTabState((state) => ({
        ...state,
        results: scored,
        loading: false,
      }));
    } catch (err) {
      updateCurrentTabState((state) => ({
        ...state,
        error: err?.message || "Failed to analyze file. Please try a PDF or DOCX.",
        loading: false,
      }));
    }
  }

  return (
    <>
      <div className="header">
        <h1>📄 Resume, CV & SOP Checker</h1>
        <p>Upload your document and get an instant strength score</p>
      </div>

      <div className="container">
        <TabSwitcher activeTab={activeTab} setActiveTab={handleTabChange} />
        <FileUploader
          file={currentState.file}
          setFile={handleFileSelect}
          activeTab={activeTab}
          inputKey={uploadResetKey}
        />

        <button
          className="analyze-btn"
          onClick={handleAnalyze}
          disabled={!currentState.file || currentState.loading}
        >
          {currentState.loading ? "⏳ Analyzing..." : currentState.file ? `✨ Analyze My ${activeTab === "resume" ? "Resume" : activeTab === "cv" ? "CV" : "SOP"}` : "Upload a file first"}
        </button>

        {currentState.error && <div className="error-message">{currentState.error}</div>}
        {currentState.results && <ScoreCard results={currentState.results} />}
        {currentState.results && <FeedbackSection results={currentState.results} />}
      </div>
    </>
  );
}