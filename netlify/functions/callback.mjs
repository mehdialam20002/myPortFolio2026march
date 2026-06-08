// Step 2 of the GitHub OAuth web flow — exchange the code for a token and hand
// it back to the Decap CMS window via postMessage.
export async function handler(event) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  const code = event.queryStringParameters?.code;

  if (!clientId || !clientSecret) {
    return html(renderScript("error", { error: "OAuth env vars missing." }));
  }
  if (!code) {
    return html(renderScript("error", { error: "Missing ?code from GitHub." }));
  }

  try {
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });
    const data = await res.json();

    if (data.access_token) {
      return html(
        renderScript("success", {
          token: data.access_token,
          provider: "github",
        })
      );
    }
    return html(
      renderScript("error", { error: data.error || "No access token returned." })
    );
  } catch (err) {
    return html(renderScript("error", { error: String(err) }));
  }
}

function html(body) {
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html", "Cache-Control": "no-store" },
    body,
  };
}

// The exact handshake Decap CMS listens for.
function renderScript(status, content) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  return `<!doctype html><html><head><meta charset="utf-8" /></head><body>
<script>
  (function () {
    function receiveMessage(e) {
      window.opener.postMessage(${JSON.stringify(message)}, e.origin);
      window.removeEventListener("message", receiveMessage, false);
    }
    window.addEventListener("message", receiveMessage, false);
    window.opener.postMessage("authorizing:github", "*");
  })();
</script>
<p>Completing sign-in… you can close this window.</p>
</body></html>`;
}
