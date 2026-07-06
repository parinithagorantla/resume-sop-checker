export function scoreCV(text) {
  const t = text.toLowerCase();
  const categories = [];
  const feedback = [];

  const hasContact = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/.test(t) && /(\+?\d[\d\s\-().]{7,}\d)/.test(t);
  const contactScore = hasContact ? 15 : 0;
  categories.push({ name: 'Contact Information', score: contactScore, max: 15 });
  feedback.push({ passed: hasContact, title: 'Contact Information', message: hasContact ? 'Contact details found.' : 'Add a professional email and phone number.' });

  const hasSummary = /summary|professional summary|profile/.test(t);
  const summaryScore = hasSummary ? 15 : 0;
  categories.push({ name: 'Professional Summary', score: summaryScore, max: 15 });
  feedback.push({ passed: hasSummary, title: 'Professional Summary', message: hasSummary ? 'Summary section detected.' : 'Add a short professional summary.' });

  const hasExperience = /experience|work history|employment|worked at|job|position|role/.test(t);
  const hasDates = /20\d{2}|19\d{2}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/.test(t);
  const expScore = (hasExperience ? 20 : 0) + (hasDates ? 10 : 0);
  categories.push({ name: 'Work Experience', score: expScore, max: 30 });
  feedback.push({ passed: hasExperience, title: 'Experience Section', message: hasExperience ? 'Experience section detected.' : 'Add work experience with responsibilities and achievements.' });
  feedback.push({ passed: hasDates, title: 'Timeline Details', message: hasDates ? 'Dates or timeline found.' : 'Add dates to your roles and achievements.' });

  const actionVerbs = ['led', 'managed', 'built', 'created', 'designed', 'developed', 'increased', 'improved', 'launched', 'achieved', 'delivered', 'coordinated', 'implemented', 'analyzed', 'trained'];
  const foundVerbs = actionVerbs.filter((verb) => t.includes(verb));
  const verbScore = Math.min(20, foundVerbs.length * 4);
  categories.push({ name: 'Action Verbs', score: verbScore, max: 20 });
  feedback.push({ passed: foundVerbs.length >= 3, title: 'Impactful Language', message: foundVerbs.length >= 3 ? `Found: ${foundVerbs.slice(0, 4).join(', ')}` : 'Use stronger action verbs to describe achievements.' });

  const hasSkills = /skills|technologies|tools|proficient|expertise/.test(t);
  const hasTechSkills = /python|javascript|excel|sql|react|java|html|css|node|aws|figma|tablesau|power bi/.test(t);
  const skillScore = (hasSkills ? 10 : 0) + (hasTechSkills ? 10 : 0);
  categories.push({ name: 'Skills Section', score: skillScore, max: 20 });
  feedback.push({ passed: hasSkills, title: 'Skills Section', message: hasSkills ? 'Skills section found.' : 'Add a dedicated skills section.' });
  feedback.push({ passed: hasTechSkills, title: 'Technical Skills', message: hasTechSkills ? 'Technical skills detected.' : 'Include relevant technical tools and technologies.' });

  const hasEducation = /education|university|college|bachelor|master|degree|diploma|graduated|gpa/.test(t);
  const eduScore = hasEducation ? 10 : 0;
  categories.push({ name: 'Education', score: eduScore, max: 10 });
  feedback.push({ passed: hasEducation, title: 'Education Section', message: hasEducation ? 'Education history found.' : 'Add your education details.' });

  const totalScore = categories.reduce((sum, category) => sum + category.score, 0);
  return { score: totalScore, categories, feedback };
}
