<script lang="ts">
  import WebflowLogo from './lib/WebflowLogo.svelte';
  import DocCard from './lib/DocCard.svelte';
  import BindingsStatus from './lib/BindingsStatus.svelte';

  const FRAMEWORK = 'Svelte 5 + Vite';

  const DOC_LINKS = [
    {
      title: 'Webflow Cloud overview',
      description: 'What Webflow Cloud is and what you can build on it.',
      href: 'https://developers.webflow.com/webflow-cloud',
    },
    {
      title: 'Storing data',
      description: 'Add SQLite, Key Value, and Object Storage bindings.',
      href: 'https://developers.webflow.com/webflow-cloud/storing-data/overview',
    },
    {
      title: `${FRAMEWORK} on Webflow Cloud`,
      description: 'Build and deploy your first Webflow Cloud app.',
      href: 'https://developers.webflow.com/webflow-cloud/getting-started',
    },
    {
      title: 'Environments & deployments',
      description: 'Manage previews, production, and deployment history.',
      href: 'https://developers.webflow.com/webflow-cloud/environments',
    },
  ];
</script>

<div class="wf-page">
  <div class="wf-glow" aria-hidden></div>

  <header class="wf-header">
    <div class="wf-brand">
      <WebflowLogo />
      <span class="wf-brand-text">Webflow Cloud</span>
    </div>
    <nav class="wf-nav">
      <a href="https://developers.webflow.com/webflow-cloud" target="_blank" rel="noreferrer">Docs</a>
      <a href="https://github.com/Webflow-Examples" target="_blank" rel="noreferrer" class="wf-nav-ghost">GitHub</a>
    </nav>
  </header>

  <main class="wf-main">
    <section class="wf-hero">
      <p class="wf-eyebrow">Hello, world · {FRAMEWORK} · with bindings</p>
      <h1 class="wf-title">
        Your <span class="wf-gradient">{FRAMEWORK}</span> app
        <br />is live with Cloudflare bindings.
      </h1>
      <p class="wf-subtitle">
        D1, R2, and KV are wired in. Deploy with <code>wrangler.json</code> and Webflow Cloud provisions them automatically.
      </p>
      <div class="wf-cta">
        <a class="wf-btn wf-btn-primary" href="https://developers.webflow.com/webflow-cloud/storing-data/overview" target="_blank" rel="noreferrer">
          Read the bindings guide
        </a>
        <a class="wf-btn wf-btn-ghost" href="https://github.com/Webflow-Examples/hello-world-svelte-app-bindings" target="_blank" rel="noreferrer">
          View on GitHub
        </a>
      </div>
    </section>

    <BindingsStatus />

    <section class="wf-cards" aria-label="Documentation" style="margin-top: 32px">
      {#each DOC_LINKS as l (l.href)}
        <DocCard title={l.title} description={l.description} href={l.href} />
      {/each}
    </section>
  </main>

  <footer class="wf-footer">
    <span>
      Built with {FRAMEWORK} · Deployed on
      <a href="https://webflow.com/cloud" target="_blank" rel="noreferrer">Webflow Cloud</a>
    </span>
  </footer>
</div>
