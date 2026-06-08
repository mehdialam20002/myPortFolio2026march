// Shared AI handler used by both the Netlify function (production) and the
// Vite dev middleware (local). Keeps the API key strictly server-side.
//
// The assistant's persona + knowledge come from src/content/ai.json, so they
// are editable from the admin dashboard (CMS) — only the API KEY lives in env.

import aiContent from "../src/content/ai.json";

function buildSystemPrompt() {
  const instructions = aiContent?.instructions || "";
  const knowledge = aiContent?.knowledge || "";
  return `${instructions}\n\n${knowledge}`.trim();
}

function cleanHistory(messages) {
  const history = Array.isArray(messages) ? messages.slice(-8) : [];
  return history
    .filter(
      (m) => m && (m.role === "user" || m.role === "assistant") && m.content
    )
    .map((m) => ({ role: m.role, content: String(m.content).slice(0, 1500) }));
}

async function callGroq(system, history) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey || apiKey === "undefined") return { notConfigured: true };

  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: system }, ...history],
      temperature: 0.5,
      max_tokens: 320,
    }),
  });

  if (!res.ok) {
    return { upstreamError: `Groq error (${res.status})` };
  }
  const data = await res.json();
  return { answer: data?.choices?.[0]?.message?.content?.trim() };
}

async function callGemini(system, history) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "undefined") return { notConfigured: true };

  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";
  const contents = history.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: system }] },
        contents,
        generationConfig: { temperature: 0.5, maxOutputTokens: 320 },
      }),
    }
  );

  if (!res.ok) {
    return { upstreamError: `Gemini error (${res.status})` };
  }
  const data = await res.json();
  const answer = data?.candidates?.[0]?.content?.parts
    ?.map((p) => p.text)
    .join("")
    .trim();
  return { answer };
}

export async function askMehdi(messages) {
  const provider = (process.env.AI_PROVIDER || "groq").toLowerCase();
  const system = buildSystemPrompt();
  const history = cleanHistory(messages);

  try {
    const result =
      provider === "gemini"
        ? await callGemini(system, history)
        : await callGroq(system, history);

    if (result.notConfigured) {
      return {
        ok: false,
        status: 503,
        error:
          "AI is not configured yet. Add your API key in the site environment variables.",
      };
    }
    if (result.upstreamError) {
      return { ok: false, status: 502, error: result.upstreamError };
    }
    return {
      ok: true,
      status: 200,
      answer: result.answer || "Sorry, I couldn't generate a reply just now.",
    };
  } catch (err) {
    return {
      ok: false,
      status: 500,
      error: "Failed to reach the AI service.",
      detail: String(err).slice(0, 300),
    };
  }
}
