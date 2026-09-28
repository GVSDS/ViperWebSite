<script setup lang="ts">
/** 交互式 REPL 版块：左侧能力点，右侧会话示例终端窗 */
import { t } from '@/i18n'
</script>

<template>
  <section id="repl" class="section repl">
    <div class="container">
      <div class="sec-head" data-reveal>
        <p class="eyebrow mono">{{ t.repl.eyebrow }}</p>
        <h2 class="section-title">{{ t.repl.title }}</h2>
        <p class="section-sub">{{ t.repl.sub }}</p>
      </div>

      <div class="repl-body">
        <ul class="repl-points">
          <li
            v-for="(p, i) in t.repl.points"
            :key="i"
            class="repl-point"
            :style="{ '--reveal-delay': `${i * 70}ms` }"
            data-reveal
          >
            <span class="p-dot" aria-hidden="true"></span>
            <div>
              <h3 class="p-title">{{ p.title }}</h3>
              <p class="p-desc">{{ p.desc }}</p>
            </div>
          </li>
        </ul>

        <div class="repl-visual" data-reveal>
          <div class="code-win repl-term">
            <div class="code-win__bar">
              <span class="code-win__dot"></span>
              <span class="code-win__dot"></span>
              <span class="code-win__dot"></span>
              <span class="code-win__file">TransPyV --repl</span>
            </div>
            <pre><code><span
              v-for="(line, i) in t.repl.lines"
              :key="i"
              class="r-line"
              :class="{ 'r-out': line.startsWith('11') }"
            >{{ line }}</span></code></pre>
          </div>
          <p class="repl-caption mono">{{ t.repl.sampleTitle }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sec-head {
  margin-bottom: clamp(40px, 6vw, 64px);
}

.repl-body {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  gap: clamp(32px, 4vw, 64px);
  align-items: start;
}

.repl-points {
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.repl-point {
  display: grid;
  grid-template-columns: 16px minmax(0, 1fr);
  gap: 14px;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.55s ease var(--reveal-delay), transform 0.6s var(--ease-out) var(--reveal-delay);
}

.repl-point.in {
  opacity: 1;
  transform: none;
}

.p-dot {
  margin-top: 7px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1px solid var(--accent);
  background: rgba(var(--accent-rgb), 0.12);
  box-shadow: 0 0 10px -2px var(--glow);
}

.p-title {
  font-size: 1.06rem;
  font-weight: 650;
  letter-spacing: -0.012em;
}

.p-desc {
  margin-top: 6px;
  color: var(--text-dim);
  font-size: 0.95rem;
  max-width: 58ch;
}

.repl-term {
  --text: #e6f1ea;
  --accent: #4ddb8a;
  box-shadow: var(--shadow-code), 0 0 0 1px rgba(var(--accent-rgb), 0.16);
}

.repl-term code {
  display: block;
  padding: 16px 22px 20px;
}

.r-line {
  display: block;
  font-size: 0.86rem;
  line-height: 1.85;
  color: var(--tok-plain);
}

.r-out {
  color: var(--tok-fn);
}

.repl-caption {
  margin-top: 14px;
  color: var(--text-faint);
  font-size: 0.76rem;
  letter-spacing: 0.05em;
}

@media (max-width: 980px) {
  .repl-body {
    grid-template-columns: 1fr;
  }
}
</style>
