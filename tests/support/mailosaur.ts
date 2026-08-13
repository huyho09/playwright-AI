const API_BASE = 'https://mailosaur.com/api';

function authHeader() {
  return 'Basic ' + Buffer.from(`${process.env.MAILOSAUR_API_KEY!}:`).toString('base64');
}

/** MAILOSAUR_DOMAIN looks like "@yksp4gti.mailosaur.net" — the server ID is the first label. */
function serverId() {
  return process.env.MAILOSAUR_DOMAIN!.replace(/^@/, '').split('.')[0];
}

export function mailosaurTestEmail(prefix = 'test') {
  return `${prefix}${process.env.MAILOSAUR_DOMAIN}`;
}

export async function deleteAllMessages() {
  const res = await fetch(`${API_BASE}/messages?server=${serverId()}`, {
    method: 'DELETE',
    headers: { Authorization: authHeader() },
  });
  if (!res.ok && res.status !== 404) {
    throw new Error(`Mailosaur delete failed: ${res.status} ${await res.text()}`);
  }
}

type MailosaurMessage = {
  id: string;
  html?: { links?: { href: string; text: string }[]; body?: string };
  text?: { links?: { href: string; text: string }[]; body?: string };
};

export async function waitForLatestMessage(sentTo: string, timeoutMs = 60000): Promise<MailosaurMessage> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const searchRes = await fetch(`${API_BASE}/messages/search?server=${serverId()}`, {
      method: 'POST',
      headers: { Authorization: authHeader(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ sentTo }),
    });
    if (searchRes.ok) {
      const data = (await searchRes.json()) as { items?: { id: string }[] };
      if (data.items?.length) {
        const msgRes = await fetch(`${API_BASE}/messages/${data.items[0].id}`, {
          headers: { Authorization: authHeader() },
        });
        return msgRes.json();
      }
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error(`Timed out waiting for a Mailosaur message sent to ${sentTo}`);
}

export function findResetLink(message: MailosaurMessage): string {
  const links = message.html?.links ?? message.text?.links ?? [];
  const resetLink = links.find((l) => /reset/i.test(l.href) || /reset/i.test(l.text));
  if (!resetLink) throw new Error('No reset link found in the Mailosaur message.');
  return resetLink.href;
}
