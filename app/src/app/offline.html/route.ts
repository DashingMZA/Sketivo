import { BRAND_FAVICON, BRAND_LOGO_ICON, BRAND_NAME } from "@/lib/brand";

export const dynamic = "force-static";
export const revalidate = false;

// The offline fallback the service worker precaches. Rendered from the brand
// so a rebranded instance doesn't show the upstream name or logo offline.

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const DEFAULT_LOGO_ICON = "/images/logo-icon.svg";

const DEFAULT_LOGO = `      <svg width="149" height="149" viewBox="0 0 149 149" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 74.50 141.00 L 107.88 99.87 A 52.00 52.00 0 1 0 41.12 99.87 L 74.50 141.00 Z" fill="url(#paint0_linear_offline)"/>
        <circle cx="74.5" cy="60" r="19" fill="white"/>
        <defs>
          <linearGradient id="paint0_linear_offline" x1="118" y1="30" x2="7" y2="115" gradientUnits="userSpaceOnUse">
            <stop stop-color="#5D5FE5"/>
            <stop offset="1" stop-color="#5ECFF9"/>
          </linearGradient>
        </defs>
      </svg>`;

export function buildOfflinePage() {
  const name = escape(BRAND_NAME);
  const favicon = escape(BRAND_FAVICON);
  const logo =
    BRAND_LOGO_ICON === DEFAULT_LOGO_ICON
      ? DEFAULT_LOGO
      : `      <img src="${escape(BRAND_LOGO_ICON)}" alt="${name}" width="64" height="64" />`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Offline — ${name}</title>
  <meta name="theme-color" content="#ffffff" />
  <link rel="icon" href="${favicon}" />
  <style>
    :root {
      --bg: #ffffff;
      --card-bg: #f8fafc;
      --card-border: #e2e8f0;
      --text: #0f172a;
      --text-muted: #64748b;
      --primary: #5d5fe5;
      --primary-hover: #4b4dc8;
      --primary-fg: #ffffff;
      --badge-bg: #fee2e2;
      --badge-text: #ef4444;
      --badge-dot: #dc2626;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --bg: #090d16;
        --card-bg: #0f172a;
        --card-border: #1e293b;
        --text: #f8fafc;
        --text-muted: #94a3b8;
        --primary: #5d5fe5;
        --primary-hover: #7173ec;
        --primary-fg: #ffffff;
        --badge-bg: rgba(239, 68, 68, 0.15);
        --badge-text: #f87171;
        --badge-dot: #ef4444;
      }
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      text-align: center;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .container {
      max-width: 440px;
      width: 100%;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 1.25rem;
      padding: 2.5rem 2rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .logo-wrap {
      width: 64px;
      height: 64px;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 1rem;
      background: linear-gradient(135deg, rgba(93, 95, 229, 0.1), rgba(94, 207, 249, 0.1));
      border: 1px solid rgba(93, 95, 229, 0.2);
    }

    .logo-wrap svg {
      width: 40px;
      height: 40px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      background-color: var(--badge-bg);
      color: var(--badge-text);
      margin-bottom: 1rem;
      letter-spacing: 0.025em;
      text-transform: uppercase;
    }

    .badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--badge-dot);
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }

    h1 {
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: -0.025em;
      margin-bottom: 0.5rem;
      color: var(--text);
    }

    p {
      font-size: 0.925rem;
      line-height: 1.5;
      color: var(--text-muted);
      margin-bottom: 1.75rem;
    }

    .actions {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 0.75rem;
    }

    button {
      width: 100%;
      padding: 0.75rem 1.25rem;
      font-size: 0.925rem;
      font-weight: 600;
      border-radius: 0.75rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.15s ease-in-out;
      border: none;
    }

    .btn-primary {
      background-color: var(--primary);
      color: var(--primary-fg);
    }

    .btn-primary:hover {
      background-color: var(--primary-hover);
      transform: translateY(-1px);
    }

    .btn-primary:active {
      transform: translateY(0);
    }

    .status-text {
      margin-top: 1.25rem;
      font-size: 0.75rem;
      color: var(--text-muted);
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo-wrap">
${logo}
    </div>

    <div class="badge" id="offline-badge">
      <span class="badge-dot"></span>
      <span>No Internet Connection</span>
    </div>

    <h1>You are currently offline</h1>
    <p>${name} needs an active internet connection to access remote repositories, branches, and content. Reconnecting will automatically restore your workspace.</p>

    <div class="actions">
      <button class="btn-primary" id="retry-btn" onclick="retryConnection()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
          <path d="M3 3v5h5"/>
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
          <path d="M16 16h5v5"/>
        </svg>
        Retry Connection
      </button>
    </div>

    <div class="status-text" id="status-message">
      Will automatically reconnect when network is back.
    </div>
  </div>

  <script>
    function navigateBackToApp() {
      if (window.location.pathname.includes('offline.html')) {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = '/';
        }
      } else {
        window.location.reload();
      }
    }

    function retryConnection() {
      const btn = document.getElementById('retry-btn');
      const status = document.getElementById('status-message');
      if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.7';
      }
      if (status) {
        status.textContent = 'Reconnecting...';
      }

      navigateBackToApp();
    }

    window.addEventListener('online', () => {
      const badge = document.getElementById('offline-badge');
      const status = document.getElementById('status-message');
      if (badge) {
        badge.style.backgroundColor = 'rgba(34, 197, 94, 0.15)';
        badge.style.color = '#22c55e';
        badge.innerHTML = '<span class="badge-dot" style="background-color:#22c55e"></span><span>Connected</span>';
      }
      if (status) {
        status.textContent = 'Network detected! Reloading workspace...';
      }
      setTimeout(() => {
        navigateBackToApp();
      }, 300);
    });
  </script>
</body>
</html>
`;
}

export function GET() {
  return new Response(buildOfflinePage(), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
