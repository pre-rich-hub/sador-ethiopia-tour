import 'server-only'
import fr from '@/content/i18n/fr.json'
import de from '@/content/i18n/de.json'
import it from '@/content/i18n/it.json'
import es from '@/content/i18n/es.json'

/**
 * Content translations. Each dictionary maps an English string from
 * content/*.json to its translation; missing entries fall back to English.
 */
const dictionaries: Record<string, Record<string, string>> = { fr, de, it, es }

export type Translate = (text: string) => string

export function translator(locale: string): Translate {
  const dict = dictionaries[locale]
  return dict ? (text) => dict[text] ?? text : (text) => text
}

/** First sentence of a text, used for card summaries. */
export function firstSentence(paragraphs: string[], max = 190) {
  // Skip short heading-like lines (e.g. "Gondar… the Camelot of Africa") that have no closing punctuation.
  const prose = paragraphs.filter((x) => x.length > 60 || /[.!?]$/.test(x.trim()))
  const text = (prose.length ? prose : paragraphs).join(' ')
  const sentence = text.split(/(?<=[.!?])\s+/)[0] ?? text
  return sentence.length > max ? `${sentence.slice(0, max).replace(/\s+\S*$/, '')}…` : sentence
}
