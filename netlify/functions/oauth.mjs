import { randomBytes } from "node:crypto";

// Step 1 of the GitHub OAuth web flow — redirect the CMS popup to GitHub.
export async function handler(event) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    return {
      statusCode: 500,
      body: "OAUTH_GITHUB_CLIENT_ID is not set in environment variables.",
    };
  }

  const proto = event.headers["x-forwarded-proto"] || "https";
  const host = event.headers.host;
  const redirectUri = `${proto}://${host}/.netlify/functions/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "repo,user",
    state: randomBytes(12).toString("hex"),
    allow_signup: "false",
  });

  return {
    statusCode: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${params.toString()}`,
      "Cache-Control": "no-store",
    },
    body: "",
  };
}
