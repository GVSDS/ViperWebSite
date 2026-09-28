<script setup lang="ts">
import { computed } from 'vue'
import { t, currentLang, type Lang } from '@/i18n'

const statusText: Record<string, Record<Lang, string>> = {
  done: { zh: '已完成', en: 'Done' },
  active: { zh: '进行中', en: 'In progress' },
  next: { zh: '下一步', en: 'Next' },
}

const phase = (p: string) => statusText[p]?.[currentLang.value] ?? p
const phaseClass = (p: string) => (p === 'active' ? 'phase-active' : p === 'done' ? 'phase-done' : 'phase-next')
</script>

<template>
  <section id="roadmap" class="section roadmap">
    <div class="container">
      <div class="sec-head" data-reveal>
        <p class="eyebrow mono">{{ t.roadmap.eyebrow }}</p>
        <h2 class="section-title">{{ t.roadmap.title }}</h2>
        <p class="section-sub">{{ t.roadmap.sub }}</p>
      </div>

      <div class="road">
        <article
          v-for="(item, i) in t.roadmap.items"
          :key="i"
          class="road-item"
          :class="[phaseClass(item.phase)]"
          :style="{ '--reveal-delay': `${i * 120}ms` }"
          data-reveal
        >
          <span class="road-dot" aria-hidden="true"></span>
          <div class="road-card">
            <div class="road-top">
              <span class="road-phase mono">{{ phase(item.phase) }}</span>
              <span class="road-line-mono mono" aria-hidden="true">──</span>
            </div>
            <h3 class="road-title">{{ item.title }}</h3>
            <p class="road-desc">{{ item.desc }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.roadmap {
  /* 与前后 section 无缝衔接：两端都回到 --bg */
  background: linear-gradient(180deg, var(--bg), var(--bg-soft) 18%, var(--bg));
}

.sec-head {
  margin-bottom: clamp(44px, 7vw, 70px);
}

.road {
  position: relative;
  margin-left: 6px;
}

.road-item {
  position: relative;
  padding: 0 0 44px 46px;
}

.road-item:last-child {
  padding-bottom: 8px;
}

/* 竖向轨道 */
.road-item::before {
  content: '';
  position: absolute;
  top: 6px;
  bottom: 0;
  left: 7px;
  width: 1px;
  background: var(--line-soft);
}

.road-item:last-child::before {
  display: none;
}

.road-dot {
  position: absolute;
  top: 6px;
  left: 0;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: var(--bg);
  border: 1px solid var(--line);
}

.phase-done .road-dot {
  background: var(--accent);
  border-color: var(--accent);
}

.phase-active .road-dot {
  background: var(--accent-strong);
  border-color: var(--accent-strong);
  box-shadow: 0 0 0 5px rgba(var(--accent-rgb), 0.12), 0 0 18px -2px var(--glow);
}

.phase-next .road-dot {
  border-color: var(--text-faint);
}

.road-top {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.road-phase {
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  border-radius: 999px;
  padding: 3px 12px;
  border: 1px solid var(--line-soft);
  color: var(--text-faint);
}

.phase-done .road-phase {
  color: var(--accent-strong);
  border-color: rgba(var(--accent-rgb), 0.4);
  background: rgba(var(--accent-rgb), 0.05);
}

.phase-active .road-phase {
  color: var(--accent-strong);
  border-color: var(--line);
  background: rgba(var(--accent-rgb), 0.08);
}

.road-line-mono {
  color: var(--text-faint);
  opacity: 0.5;
  font-size: 0.7rem;
  letter-spacing: 0.4em;
}

.road-title {
  font-size: clamp(1.12rem, 1.8vw, 1.42rem);
  font-weight: 650;
  letter-spacing: -0.01em;
  margin-bottom: 8px;
}

.phase-active .road-title {
  color: var(--accent);
}

.road-desc {
  color: var(--text-dim);
  font-size: 0.98rem;
  max-width: 68ch;
}

@media (max-width: 600px) {
  .road-item {
    padding-left: 34px;
  }
}
</style>
