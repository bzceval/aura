import type { CheckIn } from '@/features/checkin/types';

const ENDPOINT = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-5-5';
const MAX_TOKENS = 400;

interface MessagesResponse {
  content: { type: string; text?: string }[];
}

function buildPrompt(checkIns: readonly CheckIn[]): string {
  const lines = checkIns
    .map((c) => `${c.day}: mood ${c.valence}/5, energy ${Math.round(c.energy * 100)}%${c.note ? `, note: "${c.note}"` : ''}`)
    .join('\n');

  return `Here are my mood check-ins from the past week:\n${lines}\n\nWrite a warm, perceptive reflection in 3-4 sentences. Name one pattern you notice and offer one gentle suggestion. No bullet points, no medical advice.`;
}

export async function reflectWithClaude(apiKey: string, checkIns: readonly CheckIn[]): Promise<string> {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: 'You are Aura, a calm and emotionally intelligent journaling companion. Reply in the language of the notes if present, otherwise English.',
      messages: [{ role: 'user', content: buildPrompt(checkIns) }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Claude API ${response.status}`);
  }

  const data = (await response.json()) as MessagesResponse;
  const text = data.content.find((block) => block.type === 'text')?.text;
  if (!text) throw new Error('Claude API returned no text');
  return text.trim();
}
