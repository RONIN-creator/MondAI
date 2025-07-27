const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async (event) => {
  const { message, tone } = JSON.parse(event.body || '{}');

  if (!message) {
    return { statusCode: 400, body: JSON.stringify({ error: "No input" }) };
  }

  const prompt = `
You are MondAI, a multilingual assistant. Respond in the same language used by the user.
Maintain a "${tone}" tone. Here is the message: ${message}
  `.trim();

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o",
    });

    const reply = chatCompletion.choices[0].message.content;
    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};