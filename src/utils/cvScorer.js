export function scoreCV(text) {
  const t = text.toLowerCase();
  const categories = [];
  const feedback = [];

  const hasContact = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/.test(t) && /(\+?\d[\d\s\-().]{7,}\d)/.test(t);
  const contactScore = hasContact ? 15 : 0;
  categories.push({ name: 'Contact Information', score: contactScore, max: 15, details: [
    { type: hasContact ? 'success' : 'warning', text: hasContact ? 'Contact details are present and easy to find.' : 'Add a professional email address and phone number.' }
  ] });
  feedback.push({ passed: hasContact, title: 'Contact Information', message: hasContact ? 'Contact details found.' : 'Add a professional email and phone number.' });

  const hasSummary = /summary|professional summary|profile/.test(t);
  const summaryScore = hasSummary ? 15 : 0;
  categories.push({ name: 'Professional Summary', score: summaryScore, max: 15, details: [
    { type: hasSummary ? 'success' : 'warning', text: hasSummary ? 'A summary section helps recruiters understand your profile quickly.' : 'Add a concise professional summary near the top of the CV.' }
  ] });
  feedback.push({ passed: hasSummary, title: 'Professional Summary', message: hasSummary ? 'Summary section detected.' : 'Add a short professional summary.' });

  const hasExperience = /experience|work history|employment|worked at|job|position|role/.test(t);
  const hasDates = /20\d{2}|19\d{2}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/.test(t);
  const expScore = (hasExperience ? 20 : 0) + (hasDates ? 10 : 0);
  categories.push({ name: 'Work Experience', score: expScore, max: 30, details: [
    { type: hasExperience ? 'success' : 'warning', text: hasExperience ? 'Work experience appears to be documented clearly.' : 'Include your relevant professional experience and achievements.' },
    { type: hasDates ? 'success' : 'warning', text: hasDates ? 'Timeline details are present for the experience section.' : 'Add dates to each role to improve clarity.' }
  ] });
  feedback.push({ passed: hasExperience, title: 'Experience Section', message: hasExperience ? 'Experience section detected.' : 'Add work experience with responsibilities and achievements.' });
  feedback.push({ passed: hasDates, title: 'Timeline Details', message: hasDates ? 'Dates or timeline found.' : 'Add dates to your roles and achievements.' });

  const actionVerbs = ['led', 'managed', 'built', 'created', 'designed', 'developed', 'increased', 'improved', 'launched', 'achieved', 'delivered', 'coordinated', 'implemented', 'analyzed', 'trained'];
  const foundVerbs = actionVerbs.filter((verb) => t.includes(verb));
  const verbScore = Math.min(20, foundVerbs.length * 4);
  categories.push({ name: 'Action Verbs', score: verbScore, max: 20, details: [
    { type: foundVerbs.length >= 3 ? 'success' : 'warning', text: foundVerbs.length >= 3 ? `Strong action verbs were detected: ${foundVerbs.slice(0, 4).join(', ')}.` : 'Use stronger action verbs to describe your achievements more effectively.' }
  ] });
  feedback.push({ passed: foundVerbs.length >= 3, title: 'Impactful Language', message: foundVerbs.length >= 3 ? `Found: ${foundVerbs.slice(0, 4).join(', ')}` : 'Use stronger action verbs to describe achievements.' });

  const hasSkills = /skills|technologies|tools|proficient|expertise/.test(t);
  const hasTechSkills = /python|javascript|excel|sql|react|java|html|css|node|aws|figma|tablesau|power bi/.test(t);
  const skillScore = (hasSkills ? 10 : 0) + (hasTechSkills ? 10 : 0);
  categories.push({ name: 'Skills Section', score: skillScore, max: 20, details: [
    { type: hasSkills ? 'success' : 'warning', text: hasSkills ? 'A skills section is present and improves scanability.' : 'Add a skills section to highlight your strengths.' },
    { type: hasTechSkills ? 'success' : 'warning', text: hasTechSkills ? 'Relevant technical skills were identified.' : 'Include technical tools and platforms relevant to your field.' }
  ] });
  feedback.push({ passed: hasSkills, title: 'Skills Section', message: hasSkills ? 'Skills section found.' : 'Add a dedicated skills section.' });
  feedback.push({ passed: hasTechSkills, title: 'Technical Skills', message: hasTechSkills ? 'Technical skills detected.' : 'Include relevant technical tools and technologies.' });

  const hasEducation = /education|university|college|bachelor|master|degree|diploma|graduated|gpa/.test(t);
  const eduScore = hasEducation ? 10 : 0;
  categories.push({ name: 'Education', score: eduScore, max: 10, details: [
    { type: hasEducation ? 'success' : 'warning', text: hasEducation ? 'Educational background is covered clearly.' : 'Add your education details for completeness.' }
  ] });
  feedback.push({ passed: hasEducation, title: 'Education Section', message: hasEducation ? 'Education history found.' : 'Add your education details.' });

  const totalScore = categories.reduce((sum, category) => sum + category.score, 0);
  return { score: totalScore, categories, feedback };
}
