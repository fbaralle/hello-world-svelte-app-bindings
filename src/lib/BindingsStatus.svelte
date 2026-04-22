<script lang="ts">
  type Status = 'ok' | 'error' | 'loading';

  interface ServiceStatus {
    status: 'ok' | 'error';
    latency: number;
    error?: string;
  }

  interface HealthcheckResponse {
    status: 'healthy' | 'degraded' | 'unhealthy';
    timestamp: string;
    services: {
      d1: ServiceStatus;
      kv_sessions: ServiceStatus;
      kv_flags: ServiceStatus;
      r2: ServiceStatus;
    };
  }

  const BINDINGS = [
    {
      key: 'd1',
      name: 'D1',
      title: 'SQL database',
      description: 'Serverless SQLite at the edge. Great for user data, CMS content, app state.',
      docs: 'https://developers.webflow.com/webflow-cloud/storing-data/sqlite',
    },
    {
      key: 'r2',
      name: 'R2',
      title: 'Object storage',
      description: 'S3-compatible object storage with zero egress fees. Ideal for uploads and assets.',
      docs: 'https://developers.webflow.com/webflow-cloud/storing-data/object-storage',
    },
    {
      key: 'kv_sessions',
      name: 'KV · Sessions',
      title: 'Session store',
      description: 'Low-latency key-value store. Perfect for sessions, caches, and tokens.',
      docs: 'https://developers.webflow.com/webflow-cloud/storing-data/key-value-store',
    },
    {
      key: 'kv_flags',
      name: 'KV · Flags',
      title: 'Feature flags',
      description: 'KV namespace dedicated to feature flags with instant global propagation.',
      docs: 'https://developers.webflow.com/webflow-cloud/storing-data/key-value-store',
    },
  ] as const;

  let data = $state<HealthcheckResponse | null>(null);
  let error = $state<string | null>(null);

  $effect(() => {
    (async () => {
      try {
        const res = await fetch('api/binding-status', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        data = (await res.json()) as HealthcheckResponse;
      } catch (e) {
        error = e instanceof Error ? e.message : 'Unknown error';
      }
    })();
  });

  function svcFor(key: (typeof BINDINGS)[number]['key']): ServiceStatus | undefined {
    return data?.services[key];
  }

  function statusFor(key: (typeof BINDINGS)[number]['key']): Status {
    if (error) return 'error';
    const svc = svcFor(key);
    if (!svc) return 'loading';
    return svc.status;
  }
</script>

<div class="wf-section-title">
  <h2>Cloudflare bindings</h2>
  <p>
    {#if error}
      Unreachable · {error}
    {:else if data}
      Last checked {new Date(data.timestamp).toLocaleTimeString()}
    {:else}
      Checking…
    {/if}
  </p>
</div>

<div class="wf-bindings">
  {#each BINDINGS as b (b.key)}
    {@const svc = svcFor(b.key)}
    {@const s = statusFor(b.key)}
    <div class="wf-binding" data-status={s}>
      <div class="wf-binding-head">
        <span class="wf-binding-name">{b.name}</span>
        <span
          class="wf-dot"
          data-status={s === 'loading' ? undefined : s}
          title={svc?.error ?? s}
        ></span>
      </div>
      <h3 class="wf-binding-title">{b.title}</h3>
      <p class="wf-binding-desc">{b.description}</p>
      <div class="wf-binding-meta">
        <span>{svc ? `${svc.latency}ms` : s === 'loading' ? '…' : '—'}</span>
        <a href={b.docs} target="_blank" rel="noreferrer">Docs ↗</a>
      </div>
    </div>
  {/each}
</div>
