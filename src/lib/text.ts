// Keeps short pieces of text on one line without changing how they read, so the
// text in src/data can keep ordinary spaces and hyphens and stay easy to edit.
//
// A non-breaking space (\u00A0) goes between a number and its unit or month, so
// "1 mm" and "18 January" never split across two lines, and around the = in a
// p-value, so "(p = 0.29)" stays whole. A word joiner (\u2060, an invisible
// character that forbids a line break) goes after a hyphen that is followed by a
// capital or a digit, so names like Grad-CAM, U-Net and NASDAQ-100 never break
// at the hyphen. The escapes make these characters visible in the code, where
// the characters themselves would look like ordinary spaces or nothing at all.
const unitsAndMonths =
  /(\d) (mm|KB|seconds|January|February|March|April|May|June|July|August|September|October|November|December)\b/g
const pValue = /\bp = (\d)/g
const namedHyphen = /([A-Za-z0-9])-(?=[A-Z0-9])/g

export function keepTogether(text: string): string {
  return text
    .replace(unitsAndMonths, '$1\u00A0$2')
    .replace(pValue, 'p\u00A0=\u00A0$1')
    .replace(namedHyphen, '$1-\u2060')
}
