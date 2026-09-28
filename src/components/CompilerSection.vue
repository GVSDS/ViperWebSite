<script setup lang="ts">
import { t } from '@/i18n'
</script>

<template>
  <section id="compiler" class="section compiler">
    <div class="container">
      <div class="sec-head" data-reveal>
        <p class="eyebrow mono">{{ t.compiler.eyebrow }}</p>
        <h2 class="section-title">{{ t.compiler.title }}</h2>
        <p class="section-sub">{{ t.compiler.sub }}</p>
      </div>

      <div class="pipeline" data-reveal>
        <div class="rail">
          <div class="rail-base" aria-hidden="true"></div>
          <div class="rail-fill" aria-hidden="true"></div>

          <div
            v-for="(step, i) in t.compiler.steps"
            :key="i"
            class="step"
            :style="{ '--stagger': `${i * 150}ms` }"
          >
            <span class="step-dot" aria-hidden="true"></span>
            <span class="step-tag mono">{{ step.tag }}</span>
            <p class="step-desc">{{ step.desc }}</p>
          </div>

          <div class="step step-final">
            <span class="step-dot final-dot" aria-hidden="true"></span>
            <span class="step-tag mono final-tag">app.exe ✓</span>
          </div>
        </div>

        <!-- 缓存与构建开关 -->
        <div class="cache" data-reveal>
          <p class="cache-title mono">{{ t.compiler.cache.title }}</p>
          <ul class="cache-list">
            <li v-for="(c, i) in t.compiler.cache.items" :key="i" class="cache-row">
              <span class="cache-flag mono">{{ c.flag }}</span>
              <span class="cache-desc">{{ c.desc }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.compiler {
  background: var(--bg);
}

.sec-head {
  margin-bottom: clamp(48px, 7vw, 80px);
}

/* 流水线 */
.pipeline {
  position: relative;
}

.rail {
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr)) auto;
  gap: 16px;
  padding-top: 4px;
}

.rail-base,
.rail-fill {
  position: absolute;
  top: 11px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--line-soft);
}

.rail-fill {
  background: linear-gradient(90deg, var(--accent), rgba(var(--accent-rgb), 0.2));
  transform: scaleX(0);
  transform-origin: left center;
  box-shadow: 0 0 14px var(--glow);
  transition: transform 1.4s var(--ease-out) 0.25s;
}

.pipeline[data-reveal].in .rail-fill {
  transform: scaleX(1);
}

.step {
  position: relative;
  padding-top: 26px;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease var(--stagger), transform 0.7s var(--ease-out) var(--stagger);
}

.step-final {
  padding-top: 26px;
  text-align: right;
}

.pipeline[data-reveal].in .step {
  opacity: 1;
  transform: none;
}

.step-dot {
  position: absolute;
  top: 4px;
  left: 0;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: var(--bg);
  border: 1px solid var(--line);
  box-shadow: 0 0 0 4px var(--bg), 0 0 12px -2px var(--glow);
}

.final-dot {
  background: var(--accent);
  border-color: var(--accent);
}

.step-tag {
  display: inline-block;
  color: var(--accent-strong);
  font-size: 0.9rem;
  font-weight: 650;
  letter-spacing: 0.02em;
  border: 1px solid var(--line);
  background: rgba(var(--accent-rgb), 0.05);
  border-radius: var(--radius-sm);
  padding: 5px 12px;
}

.step-final .final-tag {
  color: var(--accent-ink);
  background: var(--accent);
  border-color: var(--accent);
  font-weight: 750;
}

.step-desc {
  color: var(--text-dim);
  font-size: 0.92rem;
  margin-top: 14px;
  max-width: 30ch;
}

.step-final {
  color: var(--text-dim);
}

/* 缓存与构建开关面板 */
.cache {
  margin-top: clamp(34px, 5vw, 56px);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius);
  padding: 20px 22px;
}

.cache-title {
  color: var(--text-faint);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.cache-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.cache-row {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 11px 16px;
  border: 1px solid var(--line-soft);
  border-radius: var(--radius);
  background: var(--panel);
  transition: border-color 0.25s var(--ease-out), background 0.25s var(--ease-out);
}

.cache-row:hover {
  border-color: rgba(var(--accent-rgb), 0.45);
  background: rgba(var(--accent-rgb), 0.04);
}

.cache-flag {
  color: var(--accent-strong);
  font-size: 0.82rem;
  white-space: nowrap;
}

.cache-desc {
  color: var(--text-dim);
  font-size: 0.8rem;
}

@media (max-width: 1180px) {
  .step-tag {
    font-size: 0.8rem;
    padding: 4px 9px;
  }

  .step-desc {
    font-size: 0.86rem;
  }
}

@media (max-width: 980px) {
  .cache-row {
    flex: 1 1 100%;
  }
}

@media (max-width: 980px) {
  .rail {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .step,
  .step-final {
    padding: 0 0 34px 40px;
    text-align: left;
  }

  .rail-base,
  .rail-fill {
    top: 8px;
    bottom: 8px;
    left: 7px;
    width: 1px;
    height: auto;
  }

  .rail-fill {
    transform: scaleY(0);
    transform-origin: top center;
  }

  .pipeline[data-reveal].in .rail-fill {
    transform: scaleY(1);
  }

  .step-dot {
    left: 0;
    top: 0;
  }

  .step-final .final-tag {
    color: var(--accent-ink);
  }
}
</style>
