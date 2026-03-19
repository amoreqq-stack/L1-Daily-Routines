
export default async function handler(req, res) {
  // 1. Only allow POST requests (the "Check" button)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userInput } = req.body;

    // 2. Call the Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        messages: [{ role: 'user', content: userInput }],
      }),
    });

    const data = await response.json();
    
    // 3. Send the AI's answer back to your website
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Connection failed' });
  }
}
