// Plain-language explanations for the technical terms on the page. In the text
// in projects.ts, a term in double square brackets, like '[[CI/CD]]', is shown
// with a dotted underline; tapping it, pointing at it or tabbing to it shows
// this explanation. The key must match the bracketed text exactly.
export const glossary: Record<string, string> = {
  'macro F1':
    'A 0-to-1 score averaging how well each emotion is recognised, so rare ones count as much as common ones.',
  BLEU: 'A 0-to-100 score for how closely a translation matches a human one.',
  sMAPE: 'The average percentage gap between the measured and the true root length.',
  'CI/CD': 'Every code change is tested automatically before it’s released.',
  MLflow: 'A tool that records each training run’s settings and results.',
  'PID control': 'A standard controller that keeps correcting the pipette until it reaches the tip.',
  'canary rollout': 'A new version reaches a small share of users first, then everyone.',
  'Grad-CAM': 'A heat map of the image areas that drove the prediction.',
}
