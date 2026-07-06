import test from 'node:test';
import assert from 'node:assert/strict';
import { scoreCV } from './cvScorer.js';

test('scoreCV returns a strong score for a structured CV', () => {
  const text = `
  John Doe
  john.doe@email.com | +1 555 123 4567
  Professional Summary
  Software engineer with 6 years of experience building scalable web applications.
  Experience
  Senior Frontend Developer, Tech Company, 2021-Present
  Led a team of 5 engineers and built React applications that increased engagement.
  Skills
  JavaScript, React, Node.js, SQL, AWS
  Education
  Bachelor of Science in Computer Science, 2020
  `;

  const result = scoreCV(text);

  assert.ok(result.score >= 60, 'expected a strong score for a structured CV');
  assert.ok(result.categories.some((category) => category.name === 'Professional Summary'));
  assert.ok(result.feedback.some((item) => item.title === 'Contact Information'));
  assert.ok(result.categories[0].details, 'expected category details for accordion feedback');
});
