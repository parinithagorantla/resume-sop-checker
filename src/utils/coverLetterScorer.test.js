import test from 'node:test';
import assert from 'node:assert/strict';
import { scoreCoverLetter } from './coverLetterScorer.js';

test('scoreCoverLetter returns detailed feedback for a polished letter', () => {
  const text = `
  Dear Hiring Manager,
  I am excited to apply for the Software Engineer role at Example Company.
  I am drawn to your mission and team culture, and I believe my experience building React applications and leading projects will make a strong fit.
  Thank you for your time and consideration. I look forward to the opportunity to discuss my application.
  Sincerely,
  Jane Doe
  jane.doe@email.com
  +1 555 123 4567
  `;

  const result = scoreCoverLetter(text);

  assert.ok(result.score >= 70, 'expected a strong cover letter score');
  assert.ok(result.categories.some((category) => category.name === 'Opening & Context'));
  assert.ok(result.categories[0].details, 'expected accordion details for cover letters');
});
