export default function FileUploader({ file, setFile, activeTab }) {
  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  const title = activeTab === "resume"
    ? "Resume"
    : activeTab === "cv"
      ? "CV"
      : "Statement of Purpose";

  return (
    <div className="uploader">
      <div className="icon">📂</div>
      <h3>Upload your {title}</h3>
      <p>Supports PDF and Word (.docx) files</p>
      <label>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <span className="upload-btn">Choose File</span>
      </label>
      {file && <p className="file-chosen">✅ {file.name}</p>}
    </div>
  );
}