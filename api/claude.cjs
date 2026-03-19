import { Anthropic } from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  const anthropic = new Anthropic({
    apiKey: process.env.CLAUDE_API_KEY,
  });

  try {
    const msg = await anthropic.messages.create({
      model: req.body.model,
      max_tokens: req.body.max_tokens,
      system: req.body.system,
      messages: req.body.messages,
    });
    res.status(200).json(msg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
