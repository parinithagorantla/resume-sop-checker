export default function TabSwitcher({ activeTab, setActiveTab }) {
  return (
    <div className="tabs">
      <button
        className={`tab-btn ${activeTab === "resume" ? "active" : ""}`}
        onClick={() => setActiveTab("resume")}
      >
        📄 Resume Checker
      </button>
      <button
        className={`tab-btn ${activeTab === "sop" ? "active" : ""}`}
        onClick={() => setActiveTab("sop")}
      >
        🎓 SOP Checker
      </button>
    </div>
  );
}