<script setup lang="ts">
/** 生态：双列卡片网格（区别于行式列表与时间轴） */
import { t } from '@/i18n'
</script>

<template>
  <section id="ecosystem" class="section ecosystem">
    <div class="container">
      <div class="sec-head" data-reveal>
        <p class="eyebrow mono">{{ t.ecosystem.eyebrow }}</p>
        <h2 class="section-title">{{ t.ecosystem.title }}</h2>
        <p class="section-sub">{{ t.ecosystem.sub }}</p>
      </div>

      <div class="eco-grid">
        <a
          v-for="(item, i) in t.ecosystem.items"
          :key="i"
          :href="item.href || undefined"
          :target="item.href ? '_blank' : undefined"
          :rel="item.href ? 'noreferrer' : undefined"
          class="eco-card"
          :class="{ linkable: item.href }"
          :style="{ '--reveal-delay': `${(i % 3) * 70}ms` }"
          data-reveal
        >
          <div class="eco-head">
            <h3 class="eco-name mono">{{ item.name }}</h3>
            <span v-if="item.badge" class="eco-badge mono">{{ item.badge }}</span>
            <span v-if="item.href" class="eco-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8" /></svg>
            </span>
          </div>
          <span class="eco-role mono">{{ item.role }}</span>
          <p class="eco-desc">{{ item.desc }}</p>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sec-head {
  margin-bottom: clamp(36px, 5vw, 54px);
}

.eco-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.eco-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 22px 22px 20px;
  border: 1px solid var(--line-soft);
  border-radius: var(--radius);
  background: var(--bg);
  transition: border-color 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out),
    transform 0.25s var(--ease-out);
}

.eco-card.linkable:hover {
  border-color: rgba(var(--accent-rgb), 0.45);
  box-shadow: var(--shadow-code);
  transform: translateY(-2px);
}

.eco-head {
  display: flex;
  align-items: center;
  gap: 10px;
}

.eco-name {
  font-size: 1.14rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  transition: color 0.25s var(--ease-out);
}

.eco-card.linkable:hover .eco-name {
  color: var(--accent);
}

.eco-badge {
  font-size: 0.66rem;
  letter-spacing: 0.08em;
  color: var(--badge-ink);
  border: 1px solid var(--badge-line);
  border-radius: 999px;
  padding: 2px 9px;
  white-space: nowrap;
}

.eco-arrow {
  margin-left: auto;
}

.eco-arrow svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: var(--accent);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.6;
  transition: transform 0.28s var(--ease-out), opacity 0.2s;
}

.eco-card.linkable:hover .eco-arrow svg {
  transform: translate(3px, -3px);
  opacity: 1;
}

.eco-role {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-strong);
  opacity: 0.9;
}

.eco-desc {
  color: var(--text-dim);
  font-size: 0.92rem;
  line-height: 1.7;
}

@media (max-width: 760px) {
  .eco-grid {
    grid-template-columns: 1fr;
  }
}
</style>
