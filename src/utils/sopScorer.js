export function scoreSOP(text) {
  const t = text.toLowerCase();
  const categories = [];
  const feedback = [];

  // 1. Introduction (15 points)
  const hasIntro = /i am|my name|i wish|i want|my goal|my passion|i aspire|i have always/.test(t);
  const introScore = hasIntro ? 15 : 0;
  categories.push({ name: "Introduction", score: introScore, max: 15, details: [
    { type: hasIntro ? "success" : "warning", text: hasIntro ? "The opening creates a strong personal introduction." : "Start with a stronger personal opening that explains your motivation." }
  ] });
  feedback.push({ passed: hasIntro, title: "Strong Opening", message: hasIntro ? "Good introduction detected." : "Start with a strong personal opening statement." });

  // 2. Academic Background (20 points)
  const hasDegree = /bachelor|master|degree|university|college|graduated|gpa|cgpa|academic/.test(t);
  const hasGrades = /gpa|cgpa|percentage|distinction|honors|first class/.test(t);
  const acadScore = (hasDegree ? 12 : 0) + (hasGrades ? 8 : 0);
  categories.push({ name: "Academic Background", score: acadScore, max: 20, details: [
    { type: hasDegree ? "success" : "warning", text: hasDegree ? "Academic credentials and institution details were detected." : "Mention your degree, university, and relevant coursework more clearly." },
    { type: hasGrades ? "success" : "warning", text: hasGrades ? "Academic performance indicators were included." : "Add GPA, honors, or other academic achievements to strengthen credibility." }
  ] });
  feedback.push({ passed: hasDegree, title: "Degree Mentioned", message: hasDegree ? "Academic background found." : "Mention your degree and university." });
  feedback.push({ passed: hasGrades, title: "Academic Performance", message: hasGrades ? "GPA or grades mentioned." : "Include your GPA or academic achievements." });

  // 3. Career Goals (20 points)
  const hasGoals = /career|goal|aim|objective|plan|future|aspire|intend|hope to|i want to become/.test(t);
  const hasSpecific = /research|industry|startup|professor|engineer|doctor|analyst|developer|scientist/.test(t);
  const goalScore = (hasGoals ? 12 : 0) + (hasSpecific ? 8 : 0);
  categories.push({ name: "Career Goals", score: goalScore, max: 20, details: [
    { type: hasGoals ? "success" : "warning", text: hasGoals ? "Career goals are clearly articulated." : "State your career goals more explicitly to show direction." },
    { type: hasSpecific ? "success" : "warning", text: hasSpecific ? "The statement includes a specific professional direction." : "Be more specific about the role or industry you want to enter." }
  ] });
  feedback.push({ passed: hasGoals, title: "Career Goals Stated", message: hasGoals ? "Career goals found." : "Clearly state your career goals." });
  feedback.push({ passed: hasSpecific, title: "Specific Career Path", message: hasSpecific ? "Specific career direction mentioned." : "Be specific about the role or field you're targeting." });

  // 4. Why This Program (20 points)
  const hasWhy = /program|course|curriculum|faculty|professor|research|this university|this college|drawn to|attracted to/.test(t);
  const hasField = /machine learning|data science|business|law|medicine|engineering|design|finance|marketing/.test(t);
  const whyScore = (hasWhy ? 12 : 0) + (hasField ? 8 : 0);
  categories.push({ name: "Why This Program", score: whyScore, max: 20, details: [
    { type: hasWhy ? "success" : "warning", text: hasWhy ? "The statement explains why this program is relevant." : "Explain why this specific program or university is the right fit." },
    { type: hasField ? "success" : "warning", text: hasField ? "Your field of interest is clearly referenced." : "Mention your field of study or research interest more clearly." }
  ] });
  feedback.push({ passed: hasWhy, title: "Program Interest", message: hasWhy ? "Reason for choosing program found." : "Explain why you chose this specific program." });
  feedback.push({ passed: hasField, title: "Field of Study", message: hasField ? "Field of study mentioned." : "Mention your specific field of interest." });

  // 5. Writing Quality (15 points)
  const wordCount = text.split(/\s+/).length;
  const goodLength = wordCount >= 300 && wordCount <= 1000;
  const sentenceCount = text.split(/[.!?]+/).length;
  const avgWordsPerSentence = wordCount / sentenceCount;
  const goodSentences = avgWordsPerSentence >= 10 && avgWordsPerSentence <= 30;
  const writeScore = (goodLength ? 8 : 4) + (goodSentences ? 7 : 3);
  categories.push({ name: "Writing Quality", score: writeScore, max: 15, details: [
    { type: goodLength ? "success" : "warning", text: goodLength ? `The length and structure look appropriate at ${wordCount} words.` : "Adjust the length to keep the SOP detailed but concise." },
    { type: goodSentences ? "success" : "warning", text: goodSentences ? "Sentence structure appears balanced and readable." : "Review sentence length and structure to improve readability." }
  ] });
  feedback.push({ passed: goodLength, title: "SOP Length", message: goodLength ? `Good length (${wordCount} words).` : wordCount < 300 ? "SOP is too short. Aim for 500-800 words." : "SOP may be too long. Keep it under 1000 words." });

  // 6. Conclusion (10 points)
  const hasConclusion = /in conclusion|to conclude|i believe|i am confident|i look forward|grateful|thank you|i hope|i am excited/.test(t);
  const concScore = hasConclusion ? 10 : 0;
  categories.push({ name: "Conclusion", score: concScore, max: 10, details: [
    { type: hasConclusion ? "success" : "warning", text: hasConclusion ? "The closing leaves a confident final impression." : "End with a stronger conclusion that reinforces your enthusiasm and fit." }
  ] });
  feedback.push({ passed: hasConclusion, title: "Strong Conclusion", message: hasConclusion ? "Conclusion found." : "End with a confident closing statement." });

  const totalScore = categories.reduce((sum, c) => sum + c.score, 0);
  return { score: totalScore, categories, feedback };
}