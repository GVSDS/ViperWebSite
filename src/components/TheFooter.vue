<script setup lang="ts">
import { t } from '@/i18n'

const year = new Date().getFullYear()

const navAnchors: { id: string; key: keyof typeof t.nav }[] = [
  { id: 'features', key: 'features' },
  { id: 'compiler', key: 'compiler' },
  { id: 'oop', key: 'oop' },
  { id: 'meta', key: 'meta' },
  { id: 'repl', key: 'repl' },
  { id: 'source', key: 'source' },
  { id: 'start', key: 'quickstart' },
  { id: 'ecosystem', key: 'ecosystem' },
  { id: 'roadmap', key: 'roadmap' },
]

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="footer">
    <!-- 终局 CTA -->
    <div class="cta-band">
      <div class="container cta-inner" data-reveal>
        <h2 class="cta-title">{{ t.cta.title }}</h2>
        <p class="cta-sub">{{ t.cta.sub }}</p>
        <div class="cta-actions">
          <a class="btn btn-primary" href="#start">
            {{ t.cta.start }}
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
          </a>
          <a
            class="btn btn-ghost"
            href="https://git.gvsds.com/GVSDS/TransPyC"
            target="_blank"
            rel="noreferrer"
          >
            {{ t.cta.source }}
          </a>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="footer-base">
      <div class="container footer-grid">
        <div class="f-brand">
          <div class="f-brand-line">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <path d="M18 46 V18 h7 l9 15 9-15 h7 V46 H42 V31 L32 46 22 31 v15 Z" />
            </svg>
            <span class="f-name">Viper</span>
          </div>
          <p class="f-tagline">{{ t.footer.tagline }}</p>
          <p class="f-meta mono">{{ t.footer.builtBy }} · © {{ year }}</p>
        </div>

        <nav class="f-col" aria-label="site">
          <span class="f-col-title mono">{{ t.footer.linksTitle }}</span>
          <a v-for="n in navAnchors" :key="n.id" class="f-link" :href="`#${n.id}`">
            {{ t.nav[n.key] }}
          </a>
          <a
            class="f-link f-link-ext"
            href="https://venom.gvsds.com"
            target="_blank"
            rel="noreferrer"
          >
            Venom ↗
          </a>
        </nav>

        <button class="back-top mono" @click="scrollTop">
          ↑ {{ t.footer.backTop }}
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* CTA 带：与上方 section 无缝衔接（不加分隔线），仅以柔光收束页面 */
.cta-band {
  position: relative;
  overflow: hidden;
  background: radial-gradient(ellipse 70% 120% at 50% 0%, rgba(var(--accent-rgb), 0.07), transparent 70%);
}

.cta-inner {
  padding: clamp(5rem, 10vw, 8rem) 0;
  text-align: center;
}

.cta-title {
  font-size: clamp(1.9rem, 4.4vw, 3.2rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.12;
}

.cta-sub {
  margin: 18px auto 0;
  color: var(--text-dim);
  max-width: 46ch;
  font-size: 1.02rem;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  margin-top: 34px;
}

.cta-actions .btn svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.25s var(--ease-out);
}

.btn-primary:hover svg {
  transform: translateX(3px);
}

/* 底栏（深绿反色，收住浅色页） */
.footer-base {
  --text: #e7f2ec;
  --text-dim: #9db9ab;
  --text-faint: #6f8d7e;
  --line-soft: rgba(255, 255, 255, 0.09);
  --accent: #4ddb8a;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: var(--bg-deep);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: start;
  gap: 48px;
  padding: 52px 0 40px;
}

.f-brand-line {
  display: flex;
  align-items: center;
  gap: 10px;
}

.f-brand-line svg {
  width: 24px;
  height: 24px;
  fill: var(--accent);
}

.f-name {
  font-size: 1.2rem;
  font-weight: 750;
}

.f-tagline {
  margin-top: 12px;
  color: var(--text-dim);
  font-size: 0.98rem;
}

.f-meta {
  margin-top: 8px;
  color: var(--text-faint);
  font-size: 0.76rem;
  letter-spacing: 0.05em;
}

.f-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.f-col-title {
  color: var(--text-faint);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.f-link {
  color: var(--text-dim);
  font-size: 0.95rem;
  transition: color 0.2s var(--ease-out);
}

.f-link:hover {
  color: var(--accent);
}

.f-link-ext {
  color: var(--accent);
  opacity: 0.85;
}

.back-top {
  justify-self: end;
  color: var(--text-faint);
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  padding: 9px 18px;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}

.back-top:hover {
  color: var(--accent);
  border-color: var(--line);
  background: rgba(var(--accent-rgb), 0.14);
}

@media (max-width: 860px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .back-top {
    justify-self: start;
  }
}
</style>
