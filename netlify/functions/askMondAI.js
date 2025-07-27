const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async function (event) {
  const body = JSON.parse(event.body);
  const userMessage = body.message;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are MondAI, a multilingual AI assistant that can write code, build apps, and explain anything programming-related in various tones." },
        { role: "user", content: userMessage },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: response.choices[0].message.content }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error: " + err.message }),
    };
  }
};