export function scoreResume(text) {
  const t = text.toLowerCase();
  const categories = [];
  const feedback = [];

  // 1. Contact Info (15 points)
  const hasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/.test(t);
  const hasPhone = /(\+?\d[\d\s\-().]{7,}\d)/.test(t);
  const contactScore = (hasEmail ? 8 : 0) + (hasPhone ? 7 : 0);
  categories.push({ name: "Contact Information", score: contactScore, max: 15 });
  feedback.push({ passed: hasEmail, title: "Email Address", message: hasEmail ? "Email address found." : "Add a professional email address." });
  feedback.push({ passed: hasPhone, title: "Phone Number", message: hasPhone ? "Phone number found." : "Add a phone number so employers can reach you." });

  // 2. Work Experience (20 points)
  const hasExperience = /experience|work history|employment|worked at|job|position|role/.test(t);
  const hasDates = /20\d{2}|19\d{2}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/.test(t);
  const expScore = (hasExperience ? 12 : 0) + (hasDates ? 8 : 0);
  categories.push({ name: "Work Experience", score: expScore, max: 20 });
  feedback.push({ passed: hasExperience, title: "Experience Section", message: hasExperience ? "Experience section detected." : "Add a Work Experience section." });
  feedback.push({ passed: hasDates, title: "Employment Dates", message: hasDates ? "Dates found in resume." : "Add dates to your work experience." });

  // 3. Action Verbs (20 points)
  const actionVerbs = ["led","managed","built","created","designed","developed","increased","improved","launched","achieved","delivered","coordinated","implemented","analyzed","trained"];
  const foundVerbs = actionVerbs.filter((v) => t.includes(v));
  const verbScore = Math.min(20, foundVerbs.length * 4);
  categories.push({ name: "Action Verbs", score: verbScore, max: 20 });
  feedback.push({ passed: foundVerbs.length >= 3, title: "Strong Action Verbs", message: foundVerbs.length >= 3 ? `Found: ${foundVerbs.slice(0,4).join(", ")}` : "Use strong verbs like led, built, managed, increased." });

  // 4. Skills Section (15 points)
  const hasSkills = /skills|technologies|tools|proficient|expertise/.test(t);
  const hasTechSkills = /python|javascript|excel|sql|react|java|html|css|node|aws|figma/.test(t);
  const skillScore = (hasSkills ? 8 : 0) + (hasTechSkills ? 7 : 0);
  categories.push({ name: "Skills Section", score: skillScore, max: 15 });
  feedback.push({ passed: hasSkills, title: "Skills Section", message: hasSkills ? "Skills section found." : "Add a dedicated Skills section." });
  feedback.push({ passed: hasTechSkills, title: "Technical Skills", message: hasTechSkills ? "Technical skills detected." : "List specific tools and technologies you know." });

  // 5. Education (15 points)
  const hasEducation = /education|university|college|bachelor|master|degree|diploma|graduated|gpa/.test(t);
  const hasMajor = /computer science|engineering|business|marketing|finance|design|arts|science|management/.test(t);
  const eduScore = (hasEducation ? 10 : 0) + (hasMajor ? 5 : 0);
  categories.push({ name: "Education", score: eduScore, max: 15 });
  feedback.push({ passed: hasEducation, title: "Education Section", message: hasEducation ? "Education section found." : "Add your educational background." });

  // 6. Length & Format (15 points)
  const wordCount = text.split(/\s+/).length;
  const goodLength = wordCount >= 200 && wordCount <= 800;
  const hasBullets = /•|–|-|\*/.test(text);
  const formatScore = (goodLength ? 10 : 5) + (hasBullets ? 5 : 0);
  categories.push({ name: "Length & Format", score: formatScore, max: 15 });
  feedback.push({ passed: goodLength, title: "Resume Length", message: goodLength ? `Good length (${wordCount} words).` : wordCount < 200 ? "Resume is too short. Add more detail." : "Resume may be too long. Aim for 1 page." });
  feedback.push({ passed: hasBullets, title: "Bullet Points", message: hasBullets ? "Bullet points detected — good formatting." : "Use bullet points to organize your experience." });

  const totalScore = categories.reduce((sum, c) => sum + c.score, 0);
  return { score: totalScore, categories, feedback };
}