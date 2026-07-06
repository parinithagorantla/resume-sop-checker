export function scoreCoverLetter(text) {
  const t = text.toLowerCase();
  const categories = [];
  const feedback = [];

  const hasContact = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/.test(t) && /(\+?\d[\d\s\-().]{7,}\d)/.test(t);
  const contactScore = hasContact ? 15 : 0;
  categories.push({ name: 'Contact Information', score: contactScore, max: 15, details: [
    { type: hasContact ? 'success' : 'warning', text: hasContact ? 'Contact details are included for follow-up.' : 'Add a professional email and phone number for easy follow-up.' }
  ] });
  feedback.push({ passed: hasContact, title: 'Contact Information', message: hasContact ? 'Contact information present.' : 'Add contact details.' });

  const hasGreeting = /dear|hello|to whom it may concern/.test(t);
  const hasRole = /position|role|opportunity|team|company|organization/.test(t);
  const openingScore = (hasGreeting ? 8 : 0) + (hasRole ? 7 : 0);
  categories.push({ name: 'Opening & Context', score: openingScore, max: 15, details: [
    { type: hasGreeting ? 'success' : 'warning', text: hasGreeting ? 'The letter opens professionally and directly.' : 'Begin with a clear greeting and opening line.' },
    { type: hasRole ? 'success' : 'warning', text: hasRole ? 'The role or opportunity is clearly referenced.' : 'Mention the role or opportunity you are applying for.' }
  ] });
  feedback.push({ passed: hasGreeting && hasRole, title: 'Opening Context', message: hasGreeting && hasRole ? 'Opening context is strong.' : 'Clarify the opportunity and purpose.' });

  const hasMotivation = /passion|interested|excited|drawn to|aligned|fit|why/.test(t);
  const hasCompany = /company|organization|team|mission|values|culture/.test(t);
  const motivationScore = (hasMotivation ? 10 : 0) + (hasCompany ? 10 : 0);
  categories.push({ name: 'Motivation & Fit', score: motivationScore, max: 20, details: [
    { type: hasMotivation ? 'success' : 'warning', text: hasMotivation ? 'Your motivation and interest are communicated well.' : 'Explain why you are interested in this opportunity.' },
    { type: hasCompany ? 'success' : 'warning', text: hasCompany ? 'The letter shows awareness of the company or team.' : 'Mention the company, mission, or team more clearly.' }
  ] });
  feedback.push({ passed: hasMotivation && hasCompany, title: 'Motivation', message: hasMotivation && hasCompany ? 'Motivation and fit are clear.' : 'Show stronger fit and motivation.' });

  const actionVerbs = ['led', 'managed', 'built', 'created', 'designed', 'developed', 'improved', 'increased', 'delivered', 'implemented', 'achieved', 'coordinated'];
  const foundVerbs = actionVerbs.filter((verb) => t.includes(verb));
  const hasEvidence = /experience|achievement|achievements|projects|results|impact|contributed|role|responsible|success/.test(t);
  const evidenceScore = Math.min(25, (foundVerbs.length * 5) + (hasEvidence ? 5 : 0));
  categories.push({ name: 'Evidence & Achievements', score: evidenceScore, max: 25, details: [
    { type: foundVerbs.length >= 3 ? 'success' : 'warning', text: foundVerbs.length >= 3 ? `Strong achievement language was detected: ${foundVerbs.slice(0, 4).join(', ')}.` : 'Include specific achievements and measurable results.' }
  ] });
  feedback.push({ passed: foundVerbs.length >= 3, title: 'Evidence', message: foundVerbs.length >= 3 ? 'Evidence is strong.' : 'Add more evidence of impact.' });

  const hasClosing = /thank you|looking forward|sincerely|best regards|i would welcome|i am available/.test(t);
  const closingScore = hasClosing ? 15 : 0;
  categories.push({ name: 'Closing & Call to Action', score: closingScore, max: 15, details: [
    { type: hasClosing ? 'success' : 'warning', text: hasClosing ? 'The closing creates a polished, professional finish.' : 'End with a clear thank-you and invitation for follow-up.' }
  ] });
  feedback.push({ passed: hasClosing, title: 'Closing', message: hasClosing ? 'Closing is professional.' : 'Add a stronger closing statement.' });

  const totalScore = categories.reduce((sum, category) => sum + category.score, 0);
  return { score: totalScore, categories, feedback };
}
